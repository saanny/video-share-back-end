// import { Channel } from "amqplib";
// import { newConnection } from "@notifications/broker";

export async function start() {
  startQueues();
}

async function startQueues() {
  // TODO must remove comments when need to use this
  // const emailChannel: Channel = await newConnection() as Channel;
}
