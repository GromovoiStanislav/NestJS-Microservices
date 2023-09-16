import 'dotenv/config';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: [process.env.KAFKA_HOSTNAME],
  sasl: {
    mechanism: 'scram-sha-256',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  ssl: true,
});

const consumer = kafka.consumer({ groupId: 'test' });
await consumer.connect();
await consumer.subscribe({ topic: 'add.new.post', fromBeginning: true });

await consumer.run({
  autoCommit: false,
  eachMessage: async ({ topic, partition, message }) => {
    console.log('----------------------------------------------------------');
    console.log('topic:', topic);
    console.log('partition:', partition);
    //console.log(message);

    const headersAsString = {};
    for (const headerName in message.headers) {
      const headerValue = message.headers[headerName].toString();
      headersAsString[headerName] = headerValue;
    }
    console.log('headers:', headersAsString);
    console.log('value:', JSON.parse(message.value.toString()));

    // //is used to make sure previous message (which committed last) not come back to re process
    // await consumer.commitOffsets([
    //   {
    //     topic,
    //     partition,
    //     offset: (Number(message.offset) + 1).toString(),
    //   },
    // ]);
    //console.log('offset set to ', Number(message.offset) + 1);
  },
});

/*

topic: add.new.post
partition: 0
headers: {
  kafka_correlationId: '295670e511493d610f6f4',
  kafka_replyTopic: 'add.new.post.reply',
  kafka_replyPartition: '0'
}
value: { title: 'Title 1', description: 'description' }

*/
