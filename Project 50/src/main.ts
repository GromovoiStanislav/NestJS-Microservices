import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "node:path";
import { AppModule } from "./app.module";
import { EntityNotFoundExceptionFilter } from "./exception-filters/entity-not-found.exception-filter";
import { ValidationPipe } from "@nestjs/common";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:50051",
      package: "product",
      protoPath: join(__dirname, "products/proto/product.proto")
    }
  });

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOSTNAME],
        sasl: {
          mechanism: "scram-sha-256",
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD
        },
        ssl: true
      },
      consumer: {
        groupId: "nest-group1-" + Math.random()
      }
    }
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();