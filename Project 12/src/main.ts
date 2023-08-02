import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(__dirname, '../proto/hero.proto'),
      url: '0.0.0.0:50051',
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'ecbProvider',
      protoPath: join(__dirname, '../proto/ecb-provider.proto'),
      url: '0.0.0.0:50052',
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'currencyConverter',
      protoPath: join(__dirname, '../proto/currency-converter.proto'),
      url: '0.0.0.0:50053',
    },
  });

  await app.startAllMicroservices();
  //console.log(app.getMicroservices())

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
