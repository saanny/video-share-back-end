// import { Channel } from "amqplib";
// import { newConnection } from "@auth/broker";
import { createGrpcServer } from "./protos/server";

export async function start() {
    createGrpcServer()
    startQueues();
}

async function startQueues() {
    // TODO must remove comments when need to use this
    // const emailChannel: Channel = await newConnection() as Channel;
}