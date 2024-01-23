import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Partitioners } from "kafkajs";


async function bootstrap() {
  const logger = new Logger("Main");

  const KAFKA_HOSTNAME = process.env.KAFKA_HOSTNAME;
  const KAFKA_USERNAME = process.env.KAFKA_USERNAME;
  const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [KAFKA_HOSTNAME],
          ssl: true,
          sasl: {
            mechanism: "scram-sha-256",
            username: KAFKA_USERNAME,
            password: KAFKA_PASSWORD
          }
        },
        consumer: {
          groupId: "posts-consumer"
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner // Используем старый разделитель
        }
      }
    });
  await app.listen();

  logger.log("Greeting Microservice is Running!");
}

bootstrap();
