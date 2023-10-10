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

const consumer = kafka.consumer({ groupId: 'dev' });
await consumer.connect();
await consumer.subscribe({ topic: 'add.new.post', fromBeginning: true });
await consumer.subscribe({ topic: 'get.posts.list', fromBeginning: true });

const posts = [];

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

    if (topic === 'add.new.post') {
      const data = JSON.parse(message.value.toString());
      console.log('message.value', data);
      posts.push({
        title: data.title,
        description: data.description,
      });

      await producer.send({
        topic: headers.kafka_replyTopic,
        partition: +headers.kafka_replyPartition,
        messages: [
          {
            value: JSON.stringify(posts[posts.length - 1]),
            headers: {
              kafka_correlationId: headers.kafka_correlationId,
              'kafka_nest-is-disposed': '\x00',
            },
          },
        ],
      });
    }

    if (topic === 'get.posts.list') {
      await producer.send({
        topic: headers.kafka_replyTopic,
        partition: +headers.kafka_replyPartition,
        messages: [
          {
            value: JSON.stringify(posts),
            headers: {
              kafka_correlationId: headers.kafka_correlationId,
              'kafka_nest-is-disposed': '\x00',
            },
          },
        ],
      });
    }

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

topic: add.new.post
partition: 0
headers: {
  kafka_correlationId: '295670e511493d610f6f4',
  kafka_replyTopic: 'add.new.post.reply',
  kafka_replyPartition: '0'
}
value: { title: 'Title 1', description: 'description' }

*/
