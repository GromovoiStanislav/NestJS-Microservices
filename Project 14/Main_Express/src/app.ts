import 'dotenv/config';
import express, { Request, Response } from 'express';
import amqp, { Channel, Connection } from 'amqplib';
import axios from 'axios';

import { Product } from './entity/product.js';
import dataSource from './db/data-source.js';

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672';

await dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
    process.exit(1);
  });

const productRepository = dataSource.getRepository(Product);

let connection: Connection;
let channel: Channel;

try {
  connection = await amqp.connect(amqpUrl);
  channel = await connection.createChannel();
} catch (err) {
  console.error('Error during RabbitMQ initialization:', err);
  process.exit(1);
}

channel.assertQueue('product_queue', { durable: false });

channel.consume(
  'product_queue',
  async (msg) => {
    const eventProduct = JSON.parse(msg.content.toString());
    //console.log(eventProduct);
    const data = eventProduct.data;
    if (eventProduct.pattern === 'product_created') {
      const product = new Product();
      product.admin_id = parseInt(data.id);
      product.title = data.title;
      product.image = data.image;
      product.likes = data.likes;
      await productRepository.save(product);
      console.log('product created');
    } else if (eventProduct.pattern === 'product_updated') {
      const product = await productRepository.findOneBy({
        admin_id: parseInt(data.id),
      });
      productRepository.merge(product, {
        title: data.title,
        image: data.image,
      });
      await productRepository.save(product);
      console.log('product updated');
    } else if (eventProduct.pattern === 'product_liked') {
      const product = await productRepository.findOneBy({
        admin_id: parseInt(data.id),
      });
      productRepository.merge(product, {
        likes: data.likes,
      });
      await productRepository.save(product);
      console.log('product liked');
    } else if (eventProduct.pattern === 'product_deleted') {
      const admin_id = parseInt(data);
      await productRepository.delete({ admin_id });
      console.log('product deleted');
    }
  },
  { noAck: true }
);

const app = express();
app.use(express.json());

app.get('/api/products', async (req: Request, res: Response) => {
  const products = await productRepository.find();
  return res.send(products);
});

app.post('/api/products/:id/like', async (req: Request, res: Response) => {
  const product = await productRepository.findOneBy({
    admin_id: parseInt(req.params.id),
  });
  product.likes++;
  await productRepository.save(product);
  await axios.post(
    `http://localhost:3000/api/products/${product.admin_id}/like`,
    {}
  );
  return res.send(product);
});

app.listen(3001);
console.log('Listening to port: 3001');

process.on('beforeExit', () => {
  console.log('closing');
  connection.close();
});
