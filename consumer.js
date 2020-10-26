import logger from "logger";
import amqp from "amqplib";

connect();
async function connect() {
  try {
    // create a connection
    const connection = await amqp.connect("amqp://localhost:5672");
    // create a channel
    const channel = await connection.createChannel();
    await channel.assertQueue("jobQ");
    channel.consume("jobQ", (message) => {
      const input = JSON.parse(message.content.toString());
      logger.info(`Received job with input ${input.number}`);
    });
    logger.info("Waiting for messages...");
  } catch (ex) {
    logger.error(ex);
  }
}
