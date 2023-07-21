import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions } from "@nestjs/microservices";
import { grpcClientOptions } from "./grpc-client.options";

const logger = new Logger("Main");

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  // await app.startAllMicroservices();
  // await app.listen(3001);
  // logger.log(`Microservice is running on: ${await app.getUrl()}`);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    grpcClientOptions
  );
  await app.listen();
  logger.log("Microservice is listening...");
}

bootstrap();
