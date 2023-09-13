import { Body, Controller, Get, Inject, Logger, OnModuleInit, Post } from "@nestjs/common";
import { ClientKafka, EventPattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";


@Controller()
export class AppController implements OnModuleInit {

  logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    @Inject("USERS_SERVICE") private readonly userService: ClientKafka
  ) {
  }


  async onModuleInit() {
    this.userService.subscribeToResponseOf("GET_USERS"); // "GET_USERS.reply" topic
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
      message,
      user
    });

    this.userService.send("GET_USERS", {
      message,
      user
    }).subscribe((data) => {
      //console.log(data);
    });

    return "OK";
  }

  @EventPattern("GET_USERS.reply") //"GET_USERS.reply" topic
  getUsers(@Payload() payload: any) {
    //this.logger.log(payload);

    console.log("GET_USERS.reply", {
      message: payload.message,
      user: payload.user
    });
  }

  @EventPattern("PRINT_USERS.reply") //"PRINT_USERS".reply topic
  printUsers(@Payload() payload: any) {
    //this.logger.log(payload);

    console.log("PRINT_USERS.reply", {
      message: payload.message,
      user: payload.user
    });
  }

}

