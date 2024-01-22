import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const logger = new Logger("Main");

  // const app = await NestFactory.createMicroservice(
  //   AppModule,
  //   {
  //     transport: Transport.NATS,
  //     options: {
  //       url:'nats://localhost:4222'
  //       //servers: ['nats://localhost:4222'],
  //     },
  //   }
  // );
  // await app.listen();


  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      url:'nats://localhost:4222'
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);



  logger.log("Users Microservice is Running!");
}
bootstrap();
