import { Body, Controller, Get, OnModuleInit, Post } from "@nestjs/common";
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {IPost} from "./interfaces/post.interface";
import { Partitioners } from "kafkajs";

@Controller('posts')
export class PostsController implements  OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'posts',
        brokers: [process.env.KAFKA_HOSTNAME],
        ssl: true,
        sasl: {
          mechanism: "scram-sha-256",
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD
        }
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner // Используем старый разделитель
      },
      consumer: {
        groupId: 'posts-consumer'
      }
    }
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('add.new.post');
    this.client.subscribeToResponseOf('get.posts.list');
    await this.client.connect();
  }

  @Post('/')
  appPost(@Body() post: IPost) {
    return this.client.send('add.new.post', post);
  }

  @Get('/')
  getList() {
    return this.client.send('get.posts.list', '');
  }
}