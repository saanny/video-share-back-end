import { Channel, ConsumeMessage } from 'amqplib';
import { newConnection } from './';


async function subscribeToUploadVideoNotification(channel: Channel) {
    try {
        if (!channel) {
            channel = await newConnection() as Channel;
        }
        const exchangeName = 'ex-upload-video-notif';
        const routingKey = 'ex-upload-video-notif-r';
        const queueName = 'upload-video-notif';
        await channel.assertExchange(exchangeName, 'direct');
        const queue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
        await channel.bindQueue(queue.queue, exchangeName, routingKey);
        channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
            const data = JSON.parse(msg!.content.toString());
            console.log(data)
            channel.ack(msg!);
        });
    } catch (error) {

    }
}
async function subscribeToCompressVideoNotification(channel: Channel) {
    try {
        if (!channel) {
            channel = await newConnection() as Channel;
        }
        const exchangeName = 'ex-compress-video-notif';
        const routingKey = 'ex-compress-video-notif-r';
        const queueName = 'compress-video-notif';
        await channel.assertExchange(exchangeName, 'direct');
        const queue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
        await channel.bindQueue(queue.queue, exchangeName, routingKey);
        channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
            const data = JSON.parse(msg!.content.toString());
            console.log(data)
            channel.ack(msg!);
        });
    } catch (error) {

    }
}

export { subscribeToCompressVideoNotification, subscribeToUploadVideoNotification };