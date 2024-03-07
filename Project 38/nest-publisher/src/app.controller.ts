import { Body, Controller, Inject, Post } from "@nestjs/common";
import { Producer } from "kafkajs";


@Controller()
export class AppController {

  constructor(
    @Inject("KAFKA_PRODUCER") private kafkaProducer: Producer
  ) {
  }

  @Post("kafka-publish")
  async publisherKafka(@Body() body) {
    await this.kafkaProducer.send({
      topic: "payments",
      messages: [{ value: JSON.stringify(body) }]
    });
    return { message: "Message published" };
  }

}