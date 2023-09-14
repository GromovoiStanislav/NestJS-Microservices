import { Body, Controller, Get, Inject, OnModuleInit, Post } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { randomUUID } from "node:crypto";


@Controller()
export class AppController implements OnModuleInit {

  // 2-й способ
  // @Client({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.AMQP_URL],
  //     queue: "multicasting_tasks"
  //     // queue: 'tasks',
  //     // queueOptions: {
  //     //   durable: false
  //     // },
  //   }
  // })
  // client: ClientProxy;

  constructor(
    private readonly appService: AppService,
    // 1-й способ
    @Inject("USERS_SERVICE") private readonly userService: ClientProxy
  ) {

    // 3-й способ
    // private client: ClientProxy;
    //
    // constructor() {
    //   this.client = ClientProxyFactory.create({
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [process.env.AMQP_URL],
    //       queue: "multicasting_tasks"
    //       // queue: 'tasks',
    //       // queueOptions: {
    //       //   durable: false
    //       // },
    //     }
    //   });
    // }

  }


  async onModuleInit() {
    await this.userService.connect();
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post("/")
  sendMessage(
    @Body("message") message: string,
    @Body("user") user: string
  ) {

    this.userService.emit("PRINT_USERS", {
      data: {
        message,
        user
      },
      properties: {
        correlationId: randomUUID(),
        replyTo: "users.reply"
      }
    });

    return this.userService.send("GET_USERS", {
      message,
      user
    });


  }
}