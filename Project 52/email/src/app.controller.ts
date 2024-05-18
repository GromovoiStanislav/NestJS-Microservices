import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { KafkaMessage } from "kafkajs";

@Controller()
export class AppController {

  @MessagePattern("email_topic")
  async orderCompleted(@Payload() message: KafkaMessage) {
    console.log(message);
  }
}
