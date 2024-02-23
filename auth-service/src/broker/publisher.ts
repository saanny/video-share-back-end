import { Channel } from 'amqplib';

import { newConnection } from '.';

const publishMessage = async (
    channel: Channel,
    exchangeName: string,
    routingKey: string,
    message: string,
) => {
    try {
        if (!channel) {
            channel = await newConnection() as Channel;
        }
        await channel.assertExchange(exchangeName, 'direct');
        channel.publish(exchangeName, routingKey, Buffer.from(message));
    } catch (error) {
        console.log(error);
    }

};


export { publishMessage };