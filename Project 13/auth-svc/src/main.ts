import { INestMicroservice, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { join } from "path";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./auth/filter/http-exception.filter";
import { AUTH_PACKAGE_NAME } from "./auth/auth.pb";

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:50051",
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, "../proto/auth.proto")
    }
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();
