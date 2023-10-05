import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';
import { NestFactory } from '@nestjs/core';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, 'proto/users.proto'),
        package: 'users',
      },
    },
  );
  await app.listen();
}
bootstrap();