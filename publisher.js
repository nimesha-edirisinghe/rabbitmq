const amqp = require("amqplib");
import logger from "logger";

const msg = { number: process.argv[2] };
connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue("jobQ");
    channel.sendToQueue("jobQ", Buffer.from(JSON.stringify(msg)));
    logger.info(`Job sent successfully ${msg.number}`);
  } catch (error) {
    logger.error(error);
  }
}
