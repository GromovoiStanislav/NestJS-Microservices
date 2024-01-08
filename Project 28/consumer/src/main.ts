import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const logger = new Logger("Main");

  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
        queue: 'cats_queue', // Queue groups
      },
    }
  );
  await app.listen();

  logger.log("Microservice is listening...");
}
bootstrap();
