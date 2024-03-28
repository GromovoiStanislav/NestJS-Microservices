import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {Partitioners} from "kafkajs";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "api_gateway_app",
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: "api_gateway_client_01",
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
                }
            }
        ])
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}