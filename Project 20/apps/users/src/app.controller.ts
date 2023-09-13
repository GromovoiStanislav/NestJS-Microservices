import { Controller, Logger } from "@nestjs/common";
import {
  Ctx,
  EventPattern,
  KafkaContext, MessagePattern,
  Payload,
} from "@nestjs/microservices";



@Controller()
export class AppController {

  logger = new Logger(AppController.name);


  @EventPattern("PRINT_USERS") //"PRINT_USERS" topic
  async printUsers(@Payload() payload: any, @Ctx() context: KafkaContext) {
    //this.logger.log(payload);

    console.log("PRINT_USERS", {
      message: payload.message,
      user: payload.user
    });

    const consumer = context.getConsumer();
    const { offset } = context.getMessage();
    const partition = context.getPartition();
    const topic = context.getTopic();
    await consumer.commitOffsets([{ topic, partition, offset:(Number(offset)+1).toString() }]);
  }



  @MessagePattern("GET_USERS") // "GET_USERS" topic
  async getUsers(@Payload() payload: any, @Ctx() context: KafkaContext) {
    //this.logger.log(payload);

    const { headers } = context.getMessage();
    console.log("GET_USERS", {
      kafka_correlationId: headers.kafka_correlationId,
      message: payload.message,
      user: payload.user
    });

    const consumer = context.getConsumer();
    const { offset } = context.getMessage();
    const partition = context.getPartition();
    const topic = context.getTopic();
    await consumer.commitOffsets([{ topic, partition, offset:(Number(offset)+1).toString() }]);

    return {
      message: payload.message,
      user: payload.user
    };
  }


}