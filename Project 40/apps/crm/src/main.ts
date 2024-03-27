import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { CrmModule } from './crm.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CrmModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'api_gateway_client_02',
          brokers: [process.env.KAFKA_HOSTNAME],
          ssl: true,
          sasl: {
            mechanism: "scram-sha-256",
            username: process.env.KAFKA_USERNAME,
            password: process.env.KAFKA_PASSWORD
          }
        },
        consumer: {
          groupId: 'api_gateway_group_crm',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();