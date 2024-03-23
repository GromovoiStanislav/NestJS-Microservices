import { NestFactory } from '@nestjs/core';
import { RmqOptions } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { AppModule } from './app.module';
import { RmqService } from "@app/common";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('MAIN', true));

  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
