import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";


async function bootstrap() {
  const logger = new Logger("Main");

  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST ?? "localhost",
        port: process.env.REDIS_PORT ?? 6379,
        user: process.env.REDIS_USER ?? "",
        password: process.env.REDIS_PASSWORD ?? ""
      }
    }
  );
  await app.listen();

  logger.log("Microservice is listening...");
}

bootstrap();