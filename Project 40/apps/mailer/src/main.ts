import 'dotenv/config'
import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {Partitioners} from "kafkajs";
import {MailerModule} from './mailer.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        MailerModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'api_gateway_client_03',
                    brokers: [process.env.KAFKA_HOSTNAME],
                    ssl: true,
                    sasl: {
                        mechanism: "scram-sha-256",
                        username: process.env.KAFKA_USERNAME,
                        password: process.env.KAFKA_PASSWORD
                    }
                },
                producer: {
                    createPartitioner: Partitioners.DefaultPartitioner, // Partitioners.LegacyPartitioner
                },
                consumer: {
                    groupId: 'api_gateway_group_mailer',
                },
            },
        },
    );
    await app.listen();
}

bootstrap();