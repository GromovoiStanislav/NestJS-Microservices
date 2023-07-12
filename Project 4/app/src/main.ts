import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: "messages_queue",
        noAck: true,
        queueOptions: {
          durable: false
        }
      }
    });
  await app.listen();
  console.log("Microservice is listening");
}

bootstrap();
