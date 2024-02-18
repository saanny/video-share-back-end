import videoCompressor from "@compress-video/util/videoCompressor";
import { Channel } from "amqplib";
import { newConnection } from "./broker";

export async function Consumer(channel: Channel) {
  if (!channel) {
    channel = (await newConnection()) as Channel;
  }
  const exchangeName = "video_compress";
  await channel.assertExchange(exchangeName, "direct");

  const { queue } = await channel.assertQueue("", { exclusive: true });
  
  channel.bindQueue(queue, exchangeName, "video_uploaded");

  channel.consume(queue, async (msg: any) => {
    if (msg) {
      try {
        console.log(JSON.parse(msg?.content.toString("utf-8")));

        const { userId, videoPath } = JSON.parse(
          msg?.content.toString("utf-8")
        );

         await videoCompressor.compress(
          videoPath,
          userId
        );
        channel.ack(msg!);
      } catch (err) {
        console.error("Error compressing video or publishing events:", err);
      }
    }
  });
}
