import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { RedisServiceModule } from "./redis-service.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Main");

  // @ts-ignore
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RedisServiceModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST ?? "localhost",
        port: process.env.REDIS_PORT ?? 6379,
        user: process.env.REDIS_USER ?? "",
        password: process.env.REDIS_PASSWORD ?? ""
      }
    });
  await app.listen();

  logger.log("REDIS Microservice is Running!");
}
bootstrap();
