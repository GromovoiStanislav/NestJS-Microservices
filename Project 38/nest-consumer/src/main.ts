import "dotenv/config"
import {NestFactory} from "@nestjs/core";
import {Transport} from '@nestjs/microservices';
import {AppModule} from "./app.module";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.connectMicroservice({
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [config.get<string>("KAFKA_HOSTNAME")],
                ssl: true,
                sasl: {
                    mechanism: "scram-sha-256",
                    username: config.get<string>("KAFKA_USERNAME"),
                    password: config.get<string>("KAFKA_PASSWORD")
                }
            },
        },
    });

    await app.startAllMicroservices();

    await app.listen(config.get("PORT"));
}

bootstrap();
