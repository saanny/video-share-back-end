// import { Channel } from "amqplib";
import { newConnection } from "@notifications/broker";

import { createGrpcServer } from "./protos/server";

export async function start() {
    createGrpcServer();
    startQueues();
}

async function startQueues() { 
    await newConnection();
}