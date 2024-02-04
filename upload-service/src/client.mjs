// load required packages
import { createReadStream } from 'fs';

import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

// load file_uploader.proto to load the gRPC data contract
const packageDefinition = loadSync('./protos/upload.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const endpoint = 'localhost:9090';
const fileUploaderProto = loadPackageDefinition(packageDefinition).uploadVideo;

const serviceStub = new fileUploaderProto.UploadVideoService(
  endpoint,
  credentials.createInsecure()
);

// call service stub method and add callback to get the final response

const serviceCall = serviceStub.CreateUploadVideo((err, response) => {
  if (err) {
    // eslint-disable-next-line no-undef
    console.log(err);
  } else {
    // eslint-disable-next-line no-undef
    console.log(response);
  }
});

// write the stream data to the service stub method instance
serviceCall.write({
  name: '../vid.mp4'
});

// read file stream and send the data to server as BYTES
const readStream = createReadStream('../vid.mp4');
readStream.on('data', (chunk) => {
  serviceCall.write({
    chunk: Uint8Array.from(chunk)
  });
});

readStream.on('end', () => {
  serviceCall.end();
});
