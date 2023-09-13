import { Controller, Inject, Logger } from "@nestjs/common";
import {
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  Payload
} from "@nestjs/microservices";





@Controller()
export class AppController {

  logger = new Logger(AppController.name);

  constructor(
    @Inject("USERS_SERVICE") private readonly userService: ClientKafka
  ) {
  }


  @MessagePattern("GET_USERS") // "GET_USERS" topic
  getUsers(@Payload() payload: any) {
    //this.logger.log(payload);

    console.log("GET_USERS",{
      message: payload.message,
      user: payload.user
    });

    return {
      message: payload.message,
      user: payload.user
    }
  }


  @EventPattern("PRINT_USERS") //"PRINT_USERS" topic
  printUsers(@Payload() payload: any, @Ctx() context: KafkaContext) {
    //this.logger.log(payload);

    console.log("PRINT_USERS",{
      message: payload.message,
      user: payload.user
    });

    this.userService.emit("PRINT_USERS.reply", {
      message: payload.message,
      user: payload.user
    });

  }

}