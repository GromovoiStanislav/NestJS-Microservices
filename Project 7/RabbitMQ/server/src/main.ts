import "dotenv/config"
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";


const logger = new Logger("Main");


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.AMQP_URL],
  //     queue: 'tasks',
  //     queueOptions: {
  //       durable: false
  //     },
  //   }
  // });
  // await app.startAllMicroservices();
  // await app.listen(3001);
  // logger.log(`Microservice is running on: ${await app.getUrl()}`);

  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: 'tasks',
        queueOptions: {
          durable: false
        },
      }
    }
  );
  await app.listen();
  logger.log("Microservice is listening...");

}

bootstrap();
