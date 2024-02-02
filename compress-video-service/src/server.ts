import { newConnection } from "./broker/broker";
import { Consumer } from "./broker/consumer";
import { IChannelBroker } from "./interface/channelBroker.interface";

export async function start() {
  startQueues();
}

async function startQueues() {
  const channel = await newConnection()
  // const { queueName, exchangeName, channel }: IChannelBroker =
  //   await ChannelBroker();

  await Consumer(channel!);
}
