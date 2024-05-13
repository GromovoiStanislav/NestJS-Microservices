import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { KafkaMessage } from "kafkajs";

@Controller()
export class AppController {

  @MessagePattern('payments')
  consumerKafka(@Payload() message: KafkaMessage) {
    console.log(message);
  }

}