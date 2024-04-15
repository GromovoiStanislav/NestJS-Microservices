import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Producer } from "kafkajs";


@Controller()
export class AppController {

  constructor(
    @Inject("KAFKA_PRODUCER")
    private kafkaProducer: Producer
  ) {
  }


  @Post()
  async publish(@Body() body) {
    await this.kafkaProducer.send({
      topic: "test-topic",
      messages: [{ value: JSON.stringify(body) }]
    });
    return "published message";
  }


  @MessagePattern("test-topic")
  consumerMatches(
    @Payload()
      message: {
      orderId: number;
      address: {
        street: string;
        number: number;
        city: string;
        state: string;
        zip: string;
      };
    }
  ) {
    console.log("message received:");
    console.log(message);
  }
}