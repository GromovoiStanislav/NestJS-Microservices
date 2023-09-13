import { Body, Controller, Get, Inject, OnModuleInit, Post } from "@nestjs/common";
import {Client, ClientKafka, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { Partitioners } from "kafkajs";

@Controller()
export class AppController implements OnModuleInit {

  constructor(
    private readonly appService: AppService,
    //@Inject("USERS_SERVICE") private readonly userService: ClientKafka
  ) {
  }



  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: "users",
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
        groupId: "users-consumer"
      }
    }
  })
  userService: ClientKafka;




  async onModuleInit() {
    this.userService.subscribeToResponseOf('GET_USERS'); // "GET_USERS.reply" topic
    await this.userService.connect();
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('/')
   sendMessage(
    @Body('message') message: string,
    @Body('user') user: string,
  ) {

    this.userService.emit('PRINT_USERS', {
      message,
      user,
    })

    this.userService.send("GET_USERS", {
      message,
      user
    }).subscribe((data) => {
      console.log(data);
    });

    return "OK";

  }
}