import { Channel } from "amqplib";

export interface IChannelBroker {
  queueName: string;
  exchangeName: string;
  channel: Channel;
}
