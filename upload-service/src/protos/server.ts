import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { UploadVideoServiceHandlers } from './dist/uploadVideo/UploadVideoService';
import { ProtoGrpcType } from './dist/upload';
import { publishMessage } from '@upload/broker/publisher';
import { newConnection } from '@upload/broker';
import { Channel } from 'amqplib';

const host = process.env.GRPC_HOST || 'localhost:9090';

const grpcServer: UploadVideoServiceHandlers = {
  CreateUploadVideo(_call, callback) {
    _call.on('end', async () => {
      try {
 

          return callback(null, { message: 'Video uploaded successfully' });
       
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

