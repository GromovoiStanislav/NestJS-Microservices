
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { Partitioners } from "kafkajs";

async function bootstrap() {

  const KAFKA_HOSTNAME = process.env.KAFKA_HOSTNAME;
  const KAFKA_USERNAME = process.env.KAFKA_USERNAME;
  const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
      transport: Transport.KAFKA,
      options: {
        subscribe: {
          fromBeginning: true
        },
        consumer: {
          groupId: 'auth-consumer',
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner // Используем старый разделитель
        },
        client: {
          brokers: [KAFKA_HOSTNAME],
          ssl: true,
          sasl: {
            mechanism: "scram-sha-256",
            username: KAFKA_USERNAME,
            password: KAFKA_PASSWORD
          }
        }
      }
    }
  );

  await app.listen();
}

bootstrap();
