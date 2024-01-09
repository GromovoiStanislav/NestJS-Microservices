import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {

  const logger = new Logger("Main");

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => logger.log(`Running on PORT ${PORT}`));

}

bootstrap();