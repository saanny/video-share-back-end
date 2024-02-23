import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { GRPC_HOST } from "@auth/config";
import { loginService, registerService } from "@auth/service/auth";

import { ProtoGrpcType } from "./dist/auth";
import { AuthServiceHandlers } from "./dist/auth/AuthService";

const host = GRPC_HOST || "localhost:9090";

const grpcServer: AuthServiceHandlers = {
  async Login(call, callback) {
    if (call.request) {
      console.log(` ${call.request.email} ${call.request.password}`);
    }

    const result = await loginService(
      call.request.email,
      call.request.password,
    );
    if (!result) {
      throw new Error("user not found");
    }
    callback(null, {
      user: {
        email: result.user.email,
        name: result.user.userName,
      },
      token: result.token,
    });
  },
  async register(call, callback) {
    if (call.request) {
      console.log(` ${call.request.email} ${call.request.password}`);
    }
    await registerService(
      call.request.email,
      call.request.password,
      call.request.userName,
    );
    callback(null, {
      user: {
        email: call.request.email,
        name: call.request.userName,
      },
    });
  },
};
function getServer(): grpc.Server {
  const packageDefinition = protoLoader.loadSync("./src/protos/auth.proto");
  const proto = grpc.loadPackageDefinition(
    packageDefinition,
  ) as unknown as ProtoGrpcType;
  const server = new grpc.Server();
  server.addService(proto.auth.AuthService.service, grpcServer);
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
