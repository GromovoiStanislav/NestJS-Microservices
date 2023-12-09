import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const logger = new Logger("Main");

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("PORT") ?? 3000;

  await app.listen(PORT) ;

  logger.log("Api-gateway is listening...");
}
bootstrap();