import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOSTNAME],
        sasl: {
          mechanism: "scram-sha-256",
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD
        },
        ssl: true
      },
      consumer: {
        groupId: "my-consumer-" + Math.random()
      }
    }
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}

bootstrap();