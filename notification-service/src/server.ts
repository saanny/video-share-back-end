import { newConnection } from '@notifications/broker';
import { Channel } from 'amqplib';

import { createGrpcServer } from './protos/server';
import { subscribeToRegisteredUser } from './broker/consumer';

export async function start() {
    createGrpcServer();
    startQueues();
}

async function startQueues() { 
    const notificationChannel = await newConnection() as Channel;
    await subscribeToRegisteredUser(notificationChannel);
}