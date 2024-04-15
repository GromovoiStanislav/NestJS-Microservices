import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentsModule } from "./payments/payments.module";

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOSTNAME],
        sasl: {
          mechanism: "scram-sha-256",
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD
        },
        ssl: true
      },
      consumer: {
        groupId: 'payments-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();