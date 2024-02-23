import { Channel, ConsumeMessage } from 'amqplib';

import { newConnection } from './';


async function subscribeToVideoCompress(channel: Channel) {
    try {
        if (!channel) {
            channel = await newConnection() as Channel;
        }
        const exchangeName = 'ex-compress';
        const routingKey = 'ex-compress-r';
        const queueName = 'video-compress';
        await channel.assertExchange(exchangeName, 'direct');
        const queue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
        await channel.bindQueue(queue.queue, exchangeName, routingKey);
        channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
            const data = JSON.parse(msg!.content.toString());
            console.log(data);
            channel.ack(msg!);
        });
    } catch (error) {
        console.log(error);
    }
}
export { subscribeToVideoCompress };