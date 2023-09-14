import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";


async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: "users",
        noAck: false, // Message acknowledgement!!!!!!!!!!
        queueOptions: {
          durable: false
        },
      }
    }
  );

  await app.listen();
}

bootstrap();