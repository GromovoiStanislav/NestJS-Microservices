import 'dotenv/config'
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {Partitioners} from "kafkajs";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'api_gateway_client_02',
                    brokers: [process.env.KAFKA_HOSTNAME],
                    ssl: true,
                    sasl: {
                        mechanism: "scram-sha-256",
                        username: process.env.KAFKA_USERNAME,
                        password: process.env.KAFKA_PASSWORD
                    }
                },
                consumer: {
                    groupId: 'api_gateway_group_crm',
                },
                producer: {
                    createPartitioner: Partitioners.DefaultPartitioner, // Partitioners.LegacyPartitioner
                },
            },
        },
    );
    await app.listen();
}

bootstrap();