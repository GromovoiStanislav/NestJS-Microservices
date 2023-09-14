import { Controller, Logger } from "@nestjs/common";
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload, RmqContext
} from "@nestjs/microservices";


@Controller()
export class AppController {

  logger = new Logger(AppController.name);


  @EventPattern("PRINT_USERS") //"PRINT_USERS" topic
  async printUsers(@Payload() payload: any, @Ctx() context: RmqContext) {
    //this.logger.log(payload);

    console.log(`Pattern: ${context.getPattern()}`);

    console.log("PRINT_USERS.data", {
      message: payload.data.message,
      user: payload.data.user
    });
    console.log("PRINT_USERS.properties", {
      correlationId: payload.properties.correlationId,
      replyTo: payload.properties.replyTo
    });

    // Message acknowledgement!!!!!!!!!!
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    console.log("routingKey",originalMsg.fields?.routingKey);
  }



  @MessagePattern("GET_USERS") // "GET_USERS" topic
  async getUsers(@Payload() payload: any, @Ctx() context: RmqContext) {
    //this.logger.log(payload);

    console.log(`Pattern: ${context.getPattern()}`);

    console.log("GET_USERS", {
      message: payload.message,
      user: payload.user
    });

    // Message acknowledgement!!!!!!!!!!
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    console.log("routingKey",originalMsg.fields?.routingKey);
    console.log("correlationId",originalMsg.properties?.correlationId); // original. only MessagePattern
    console.log("replyTo",originalMsg.properties?.replyTo); // original. only MessagePattern

    return {
      message: payload.message,
      user: payload.user
    };
  }

}