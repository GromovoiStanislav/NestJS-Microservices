import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

const port = 3000;
const msport = 5002;

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
    console.log(`Rest api on ${port} and MS on port ${msport}`);
  });
}
bootstrap();
