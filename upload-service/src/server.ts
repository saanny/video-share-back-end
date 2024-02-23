import { Channel } from 'amqplib';
import { newConnection } from '@upload/broker';
import { createGrpcServer } from '@upload/protos/server';

export async function start() {
  startQueues();
  startGrpcServer();
}

async function startQueues() {
  // TODO must remove comments when need to use this
  const emailChannel: Channel = (await newConnection()) as Channel;
  emailChannel.connection.once('connection', () => console.log('fff'));
}

async function startGrpcServer() {
  createGrpcServer();
}
