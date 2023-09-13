import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { Partitioners } from "kafkajs";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true,
      },
      client: {
        clientId: 'users.reply',// users.reply-server
        brokers: [configService.get<string>("KAFKA_HOSTNAME")],
        ssl: true,
        sasl: {
          mechanism: 'scram-sha-256',
          username: configService.get<string>("KAFKA_USERNAME"),
          password:configService.get<string>("KAFKA_PASSWORD"),
        },
      },
      producer:{
        createPartitioner: Partitioners.LegacyPartitioner, // Используем старый разделитель
      },
      consumer: {
        groupId: 'users.reply-consumer',// users.reply-consumer-server
      },
    },
  } as MicroserviceOptions);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
