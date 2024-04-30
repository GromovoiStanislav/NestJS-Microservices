import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { AppModule } from "./app.module";
import { EntityNotFoundExceptionFilter } from "./exception-filters/entity-not-found.exception-filter";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'product',
      protoPath: join(__dirname, 'products/proto/product.proto'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();