import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";

const logger = new Logger("Main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  logger.log(`Server is running on: ${await app.getUrl()}`);
}
bootstrap();
