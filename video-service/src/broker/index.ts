import client, { Channel, Connection } from 'amqplib';
import { RABBITMQ_ENDPOINT } from '@notifications/config';

async function newConnection() {
    try {
        const connection: Connection = await client.connect(`${RABBITMQ_ENDPOINT}`);
        const channel: Channel = await connection.createChannel();
        closeConnection(channel, connection);
        return channel;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}
function closeConnection(channel: Channel, connection: Connection): void {
    process.once('SIGINT', async () => {
        await channel.close();
        await connection.close();
    });
}
export { newConnection };