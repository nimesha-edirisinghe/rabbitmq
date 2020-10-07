import logger from "logger";
import amqp from "amqplib";

connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue("jobQ");
    channel.consume("jobQ", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received job with input ${input.number}`);
    });
    logger.info("Waiting for messages...");
  } catch (ex) {
    logger.error(ex);
  }
}
