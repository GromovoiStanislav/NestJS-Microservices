import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const logger = new Logger("Main");

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          process.env.AMQP_URL,
        ],
        queue: 'greeting_queue',
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen();

  logger.log("Greeting Microservice is Running!");
}

bootstrap();
