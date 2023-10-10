import 'dotenv/config';
import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
  brokers: [process.env.KAFKA_HOSTNAME],
  sasl: {
    mechanism: 'scram-sha-256',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  ssl: true,
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner, // Используем старый разделитель
});
await producer.connect();

await producer.send({
  topic: 'add.new.post',
  partition: 0,
  messages: [
    {
      value: JSON.stringify({ title: 'Title 2', description: 'description' }),
      headers: {
        kafka_correlationId: '888ec9f5a0a27e535c571',
        kafka_replyTopic: 'add.new.post.reply',
        kafka_replyPartition: '0',
      },
    },
  ],
});

await producer.send({
  topic: 'get.posts.list',
  partition: 0,
  messages: [
    {
      value: JSON.stringify({}),
      headers: {
        kafka_correlationId: '777ec9f5a0a27e535c571',
        kafka_replyTopic: 'get.posts.list.reply',
        kafka_replyPartition: '0',
      },
    },
  ],
});

const consumer = kafka.consumer({ groupId: 'dev2' });
await consumer.connect();
await consumer.subscribe({ topic: 'add.new.post.reply', fromBeginning: true });
await consumer.subscribe({
  topic: 'get.posts.list.reply',
  fromBeginning: true,
});

await consumer.run({
  autoCommit: false,
  eachMessage: async ({ topic, partition, message }) => {
    console.log('----------------------------------------------------------');
    console.log('topic:', topic);
    console.log('partition:', partition);

    const headers = {};
    for (const headerName in message.headers) {
      const headerValue = message.headers[headerName].toString();
      headers[headerName] = headerValue;
    }
    console.log('headers:', headers);
    console.log('message.value', JSON.parse(message.value.toString()));

    await consumer.commitOffsets([
      {
        topic,
        partition,
        offset: (Number(message.offset) + 1).toString(),
      },
    ]);
    // console.log('offset set to ', Number(message.offset) + 1);
  },
});

/*

 topic: add.new.post.reply                                -
partition: 0
headers: {
  kafka_correlationId: '888ec9f5a0a27e535c571',       
  'kafka_nest-is-disposed': '\x00'
}
message.value { title: 'Title 2', description: 'descriptiption' }  
 
 */
