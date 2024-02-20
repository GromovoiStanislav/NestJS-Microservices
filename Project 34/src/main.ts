import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Main");

  const KAFKA_HOSTNAME = process.env.KAFKA_HOSTNAME;
  const KAFKA_USERNAME = process.env.KAFKA_USERNAME;
  const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD;

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true
      },
      consumer: {
        groupId: "kafka-consumer"
      },
      client: {
        brokers: [KAFKA_HOSTNAME],
        ssl: true,
        sasl: {
          mechanism: "scram-sha-256",
          username: KAFKA_USERNAME,
          password: KAFKA_PASSWORD
        }
      }
    }
  } as MicroserviceOptions);

  await app.startAllMicroservices();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => logger.log(`Running on PORT ${PORT}`));
}

bootstrap();
