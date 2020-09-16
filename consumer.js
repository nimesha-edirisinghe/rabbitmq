const amqp = require("amqplib");

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
    console.log("Waiting for messages...");
  } catch (ex) {
    console.log(ex);
  }
}
