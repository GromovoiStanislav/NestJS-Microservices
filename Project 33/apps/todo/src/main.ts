import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from "@nestjs/common";
import { join } from 'node:path';

import { TodoModule } from './todo.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../todo.proto'),
        package: 'todo',
      },
    },
  );
  await app.listen();
  const logger = new Logger("Todo-service");
  logger.log(`Running...`)
}

bootstrap();