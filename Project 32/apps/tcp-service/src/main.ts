import { NestFactory } from "@nestjs/core";
import { TcpServiceModule } from "./tcp-service.module";
import { Logger } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const logger = new Logger("Main");

  const app = await NestFactory.createMicroservice(TcpServiceModule, {
    transport: Transport.TCP,
    options: {
      port: 4000
    }
  });
  await app.listen();

  logger.log("TCP Microservice is Running!");
}

bootstrap();
