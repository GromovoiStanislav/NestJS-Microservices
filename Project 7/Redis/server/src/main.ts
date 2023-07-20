import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";


const logger = new Logger("Main");


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: "redis://localhost:6379"
    }
  });
  await app.startAllMicroservices();
  await app.listen(3001);

  // const app = await NestFactory.createMicroservice(
  //   AppModule,
  //   {
  //     transport: Transport.REDIS,
  //     options: {
  //       url: "redis://localhost:6379"
  //     }
  //   }
  // );
  // await app.listen();

  logger.log("Microservice is listening...");

}

bootstrap();
