import { NestFactory } from "@nestjs/core";
import { NatsServiceModule } from "./nats-service.module";
import { Logger } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const logger = new Logger("NATS");

  const NATS_URL = process.env.NATS_URL;

  const app = await NestFactory.createMicroservice(
    NatsServiceModule,
    {
      transport: Transport.NATS,
      options: {
        url: NATS_URL
      }
    });
  await app.listen();

  logger.log(`Microservice is Running on url ${NATS_URL}`);
}

bootstrap();
