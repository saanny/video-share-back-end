// import { Channel } from "amqplib";
// import { newConnection } from "@auth/broker";

import { mysqlConnection } from "./infra/db/mysql";
import { createGrpcServer } from "./protos/server";

export async function start() {
    mysqlConnection()
    createGrpcServer()
    startQueues();
}

async function startQueues() {
    // TODO must remove comments when need to use this
    // const emailChannel: Channel = await newConnection() as Channel;
}