import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { AppModule } from './app.module';


const logger = new Logger("Root");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  logger.log(`Microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
