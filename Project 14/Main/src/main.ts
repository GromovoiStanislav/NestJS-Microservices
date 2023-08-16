import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const logger = new Logger("Main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const AMQP_URL = configService.get<string>("AMQP_URL");

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [AMQP_URL],
      queue: 'product_queue',
      queueOptions: {
        durable: false
      },
    }
  });
  await app.startAllMicroservices();

  app.setGlobalPrefix('api')
  await app.listen(3001);
  logger.log(`Microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
