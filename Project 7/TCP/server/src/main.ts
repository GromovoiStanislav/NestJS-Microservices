import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";


const logger = new Logger("Main");


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: "127.0.0.1",
  //     port: 3001,
  //   },
  // });
  // await app.startAllMicroservices();
  // await app.listen(3001);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: "127.0.0.1",
        port: 3001
      }
    }
  );
  await app.listen();

  logger.log("Microservice is listening...");

}

bootstrap();
