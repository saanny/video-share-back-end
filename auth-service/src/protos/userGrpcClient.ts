import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import { ProtoGrpcType } from "./dist/user";
import { CreateUserRequest } from "./dist/user/CreateUserRequest";
import { GetUserRequest } from "./dist/user/GetUserRequest";
import { GetUserResponse } from "./dist/user/GetUserResponse";
import { CreateUserResponse } from "./dist/user/CreateUserResponse";

const host = "0.0.0.0:9191";
const packageDefinition = protoLoader.loadSync("./src/protos/user.proto");
const proto = grpc.loadPackageDefinition(
  packageDefinition,
) as unknown as ProtoGrpcType;

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);

const client = new proto.user.UserService(
  host,
  grpc.credentials.createInsecure(),
);

client.waitForReady(deadline, (error?: Error) => {
  if (error) {
    console.log(`Client connect error: ${error.message}`);
  }
});

export async function createUser(
  user: CreateUserRequest,
): Promise<CreateUserResponse> {
  return new Promise((resolve, reject) => {
    client.CreateUser(
      {
        email: user.email,
        name: user.name,
        password: user.password,
      },
      (error, serverMessage) => {
        if (error) {
          reject(error);
        } else if (serverMessage) {
          console.log(serverMessage.user);
          resolve(serverMessage);
        }
      },
    );
  });
}
export async function findUser(user: GetUserRequest): Promise<GetUserResponse> {
  return new Promise((resolve, reject) => {
    client.getUserInfo(
      {
        id: user.id,
        userName: user.userName,
        email: user.email,
      },
      (error, serverMessage) => {
        if (error) {
          reject(error);
        } else if (serverMessage) {
          console.log(serverMessage.user);
          resolve(serverMessage);
        }
      },
    );
  });
}
