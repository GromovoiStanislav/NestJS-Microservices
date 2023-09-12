import { Controller, Logger } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";



@Controller()
export class AppController {

  logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService
  ) {
  }


  @MessagePattern("GET_USERS") // "GET_USERS" topic
  GET_USERS(@Payload() payload: any) {
    this.logger.log(payload);

    return {
      message: payload.message,
      user: payload.user
    }
  }


  @EventPattern("PRINT_USERS") //"PRINT_USERS" topic
  Validate(@Payload() payload: any) {
    this.logger.log(payload);

    console.log("PRINT_USERS",{
      message: payload.message,
      user: payload.user
    });
  }


}