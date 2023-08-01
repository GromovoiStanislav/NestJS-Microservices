import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const port = 5002;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    },
  );


  await app.listen();
  console.log(`PAYMENT_SERVICE: only ms is running on port ${port}`);
}
bootstrap();
