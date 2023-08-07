import { INestMicroservice, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { join } from "node:path";
import { AppModule } from "./app.module";
import { PRODUCT_PACKAGE_NAME } from "./product/proto/product.pb";

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:50053",
      package: PRODUCT_PACKAGE_NAME,
      protoPath: join(__dirname, './product/proto/product.proto'),
    }
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();
