import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";


async function bootstrap() {
  const logger = new Logger("Main");

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST ?? "localhost",
        port: process.env.REDIS_PORT ?? 6379,
        // @ts-ignore
        user: process.env.REDIS_USER ?? "",
        password: process.env.REDIS_PASSWORD ?? ""
      }
    });
  await app.listen();

  logger.log("Greeting Microservice is Running!");
}

bootstrap();
