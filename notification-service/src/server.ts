import { newConnection } from "@notifications/broker";

import { createGrpcServer } from "./protos/server";
import { subscribeToRegisteredUser } from "./broker/consumer";
import { Channel } from "amqplib";

export async function start() {
    createGrpcServer();
    startQueues();
}

async function startQueues() { 
    const notificationChannel = await newConnection() as Channel;
    await subscribeToRegisteredUser(notificationChannel);
}