import { Body, Controller, Inject, OnModuleInit, Post } from "@nestjs/common";
import { Producer } from "@nestjs/microservices/external/kafka.interface";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Client, ClientKafka, Transport } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller("kafka-producers")
export class KafkaProducerController implements OnModuleInit {

  // constructor(
  //   @Inject("KAFKA_PRODUCER")  private readonly kafkaProducer: ClientKafka
  //   //@Inject("KAFKA_PRODUCER") private readonly userService: Producer
  // ) {
  // }


  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOSTNAME],
        ssl: true,
        sasl: {
          mechanism: "scram-sha-256",
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD
        }
      },
    }
  })
  kafkaProducer: ClientKafka;


  async onModuleInit() {
    this.kafkaProducer.subscribeToResponseOf("createOrder"); // "createOrder.reply" topic
    await this.kafkaProducer.connect();
  }


  @Post()
  async create(@Body() data: CreateOrderDto) {
    //  await this.kafkaProducer.send({
    //   topic: "createOrder",
    //   messages: [
    //     {
    //       key: "orders",
    //       value: JSON.stringify(data)
    //     }
    //   ]
    // });

    // return this.kafkaProducer.send(
    //     "createOrder",
    //     data
    //   );

    return firstValueFrom(this.kafkaProducer.send(
      "createOrder",
        data
      )
    );
  }

}