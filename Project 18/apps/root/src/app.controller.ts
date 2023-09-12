import { Body, Controller, Get, Inject, Logger, OnModuleInit, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { AppService } from "./app.service";

@Controller()
export class AppController implements OnModuleInit {

  constructor(
    private readonly appService: AppService,
    @Inject("USERS_SERVICE") private readonly userService: ClientKafka
  ) {
  }


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


    return firstValueFrom(
      this.userService.send('GET_USERS', {
        message,
        user,
      })
    );
  }
}