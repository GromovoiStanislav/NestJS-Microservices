import { Controller, Logger } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";



@Controller()
export class AppController {

  logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService
  ) {
  }


  @MessagePattern("GET_USERS") // "GET_USERS" topic
  getUsers(@Payload() payload: any, @Ctx() context: KafkaContext) {
    this.logger.log(payload);

    console.log(`Topic: ${context.getTopic()}`);
    console.log(`partition: ${context.getPartition()}`);
    console.log(`originalMessage: ${context.getMessage()}`);
    console.log(context.getMessage());

    return {
      message: payload.message,
      user: payload.user
    }
  }


  @EventPattern("PRINT_USERS") //"PRINT_USERS" topic
  printUsers(@Payload() payload: any, @Ctx() context: KafkaContext) {
    this.logger.log(payload);

    console.log("PRINT_USERS",{
      message: payload.message,
      user: payload.user
    });

  }


}