import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options:{
      host: '127.0.0.1',
      port: 4200
    }
  })

  await app.startAllMicroservices()
  await app.listen(3001);
  console.log(`App is running on port ${await app.getUrl()}`)
}
bootstrap();