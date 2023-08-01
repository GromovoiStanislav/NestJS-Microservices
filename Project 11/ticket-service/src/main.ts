import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const port = 3000;
const msport = 5001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        port: msport,
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();

  await app.listen(port, () => {
    console.log(`TICKET_SERVICE: rest api on ${port} and ms on port ${msport}`);
  });
}
bootstrap();
