import { Channel, ConsumeMessage } from 'amqplib';
import { newConnection } from './';


async function subscribeToUploadVideo(channel: Channel) {
    try {
        if (!channel) {
            channel = await newConnection() as Channel;
        }
        const exchangeName = 'ex-upload-video';
        const routingKey = 'ex-upload-video-r';
        const queueName = 'upload-video';
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
export { subscribeToUploadVideo };