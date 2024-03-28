import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Partitioners } from "kafkajs";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
        consumer: {
          groupId: "posts-consumer"
        },
        producer: {
          createPartitioner: Partitioners.DefaultPartitioner // Partitioners.LegacyPartitioner
        }
      }
    }
  );
  await app.listen();
}

bootstrap();