import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {

  const logger = new Logger("Main");

  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => logger.log(`Running on PORT ${PORT}`));

}

bootstrap();