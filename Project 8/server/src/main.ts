import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {Logger} from "@nestjs/common";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {join} from 'node:path'


const logger = new Logger("Main");


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
            package: 'app',
            protoPath: join(__dirname, '../src/app.proto'),
        }
    });
    await app.startAllMicroservices();
    await app.listen(3001);

    // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    //   AppModule,
    //   {
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'app',
    //       protoPath: join(__dirname, '../src/app.proto'),
    //     }
    //   }
    // );
    // await app.listen();

    logger.log("Microservice is listening...");

}

bootstrap();
