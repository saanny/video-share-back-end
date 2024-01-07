// import { Channel } from "amqplib";
// import { newConnection } from "@users/broker";

import { doUnaryCallAsync } from "./protos/client";


export async function start() {
    doUnaryCallAsync();
    startQueues();
}

async function startQueues() {
    // TODO must remove comments when need to use this
    // const emailChannel: Channel = await newConnection() as Channel;

}