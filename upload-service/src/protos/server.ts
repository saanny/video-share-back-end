import fs from 'fs/promises';
import path from 'path';

import ffmpeg from 'fluent-ffmpeg';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { UploadVideoModel } from '@upload/models/uploadVideo';

import { UploadVideoServiceHandlers } from './dist/uploadVideo/UploadVideoService';
import { ProtoGrpcType } from './dist/upload';
import { publishMessage } from '@upload/broker/publisher';
import { newConnection } from '@upload/broker';
import { Channel } from 'amqplib';

const host = process.env.GRPC_HOST || 'localhost:9090';

const grpcServer: UploadVideoServiceHandlers = {
  CreateUploadVideo(_call, callback) {
    const videoChunks: Uint8Array[] = [];
    _call.on('data', (chunk) => {
      videoChunks.push(chunk.chunk);
    });

    _call.on('end', async () => {
      try {
        const validChunks = videoChunks.filter((chunk) => chunk !== undefined);
        const videoBuffer = Buffer.concat(validChunks);

        const fileMimeType = getMimeType(videoBuffer);

        if (!fileMimeType || fileMimeType !== 'video/mp4') {
          return callback({
            code: grpc.status.ABORTED,
            details: 'Send mp4 file'
          });
        }

        const fileName = `video_${Date.now()}.mp4`;
        const filePath = path.join(__dirname, '..', '..', fileName);

        try {
          await fs.writeFile(filePath, videoBuffer);
        } catch (e) {
          console.log(e);
        }

        ffmpeg.ffprobe(filePath, async (err, metadata) => {
          if (err) {
            await fs.rm(filePath);
            return callback({
              code: grpc.status.ABORTED,
              details: 'Error getting video resolution'
            });
          }

          const resolution = metadata.streams[0].width;

          console.log(resolution);
          if (!resolution || resolution < 360) {
            await fs.rm(filePath);
            return callback({
              code: grpc.status.ABORTED,
              details:
                'Video resolution is lower than 360. Please upload a higher resolution video.'
            });
          }

          const fileDocument = await UploadVideoModel.create({
            file_name: fileName,
            resolution: String(resolution),
            ext: '.mp4',
            path_on_disk: filePath
          });

          const channel = await newConnection();
          await publishMessage(
            channel as Channel,
            'notification',
            'video_upload',
            'Video uploaded successfully'
          );

          await publishMessage(
            channel as Channel,
            'video_comperssor',
            'video_upload',
            JSON.stringify(fileDocument)
          );

          return callback(null, { message: 'Video uploaded successfully' });
        });
      } catch (error) {
        console.log(error);
        console.error('Error saving file');
        callback({
          code: grpc.status.INTERNAL,
          details: 'Internal Server Error'
        });
      }
    });
  }
};
function getServer(): grpc.Server {
  const packageDefinition = protoLoader.loadSync('./src/protos/upload.proto');
  const proto = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType;
  const server = new grpc.Server();
  server.addService(proto.uploadVideo.UploadVideoService.service, grpcServer);
  return server;
}

export function createGrpcServer() {
  const server = getServer();
  server.bindAsync(
    host,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
      if (err) {
        console.error(`Grpc Server error: ${err.message}`);
      } else {
        console.log(`Grpc Server bound on port: ${port}`);
        server.start();
      }
    }
  );
}

function getMimeType(buffer: Buffer): string | null {
  const signature = buffer.toString('hex', 4, 16);
  console.log(signature);
  if (signature === '667479706d70343200000000') {
    return 'video/mp4';
  }

  return null;
}
