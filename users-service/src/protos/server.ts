import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { createUser, findByEmail } from "@users/service/users";

import { ProtoGrpcType } from "./dist/user";
import { UserServiceHandlers } from "./dist/user/UserService";
import { UserModel } from "./dist/user/UserModel";

const host = "localhost:9191";

const grpcServer: UserServiceHandlers = {
  async CreateUser(call, callback) {
    if (call.request) {
      console.log(` ${call.request.email} ${call.request.password}`);
    }
    const user = await createUser({
      email: call.request.email,
      password: call.request.password,
      userName: call.request.name,
    });

    callback(null, {
      user: {
        email: call.request.email,
        userName: call.request.name,
        id: user?.id,
      },
    });
  },
  async getUserInfo(call, callback) {
    let result: UserModel | undefined;
    if (call.request.email) {
      result = await findByEmail(call.request.email);
    }
    console.log(call.request.email);
    callback(null, {
      user: {
        email: result?.email,
        id: result?.id,
        userName: result?.userName,
        password: result?.password,
      },
    });
  },
};
function getServer(): grpc.Server {
  const packageDefinition = protoLoader.loadSync("./src/protos/user.proto");
  const proto = grpc.loadPackageDefinition(
    packageDefinition,
  ) as unknown as ProtoGrpcType;
  const server = new grpc.Server();
  server.addService(proto.user.UserService.service, grpcServer);
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
    },
  );
}
