import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { HelloModule } from "./hello.module";
import { TrpcRouter } from "./trpc/trpc.router";

const logger = new Logger("Hello");

async function bootstrap() {
  const app = await NestFactory.create(HelloModule);

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  await app.listen(3001);

  logger.log(`Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
