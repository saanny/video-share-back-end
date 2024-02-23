import { Channel } from "amqplib";
import { newConnection } from "@auth/broker";

import { createGrpcServer } from "./protos/server";
export let authChannel: Channel;
export async function start() {
  createGrpcServer();
  startQueues();
}

async function startQueues() {
  authChannel = (await newConnection()) as Channel;
}
