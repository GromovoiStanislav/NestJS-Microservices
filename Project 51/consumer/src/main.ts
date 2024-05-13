import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get<string>("KAFKA_HOSTNAME")],
        sasl: {
          mechanism: "scram-sha-256",
          username: configService.get<string>("KAFKA_USERNAME"),
          password: configService.get<string>("KAFKA_PASSWORD")
        },
        ssl: true
      }
    }
  });

  await app.startAllMicroservices();

  //await app.listen(configService.get<number>("PORT"));

}

bootstrap();
