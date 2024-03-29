import { NestFactory } from "@nestjs/core";
import { TcpServiceModule } from "./tcp-service.module";
import { Logger } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const logger = new Logger("TCP");

  const PORT = process.env.TCP_PORT ?? 3001;

  const app = await NestFactory.createMicroservice(
    TcpServiceModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT
      }
    });
  await app.listen();

  logger.log(`Microservice is Running on PORT ${PORT}`);
}

bootstrap();
