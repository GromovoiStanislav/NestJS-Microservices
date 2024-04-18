import { Body, Controller, Inject, Post } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
//import { KafkaMessage, Producer } from "kafkajs";
import {
  KafkaMessage,
  Producer,
} from '@nestjs/microservices/external/kafka.interface';

@Controller()
export class KafkaController {

  constructor(
    @Inject("KAFKA_PRODUCER") private kafkaProducer: Producer
  ) {
  }

  @MessagePattern("test-topic")
  consumer(@Payload() message: KafkaMessage) {
    console.log(message);
  }

  @Post("test-kafka")
  async producer(@Body() body) {
    await this.kafkaProducer.send({
      topic: "test-topic",
      messages: [
        {
          key: "payments",
          value: JSON.stringify(body)
        }
      ]
    });

    return 'OK'
  }
}