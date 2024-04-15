import { Module } from "@nestjs/common";
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";


@Module({
  imports: [
    ClientsModule.register([
      {
        name: "KAFKA_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_HOSTNAME],
            sasl: {
              mechanism: "scram-sha-256",
              username: process.env.KAFKA_USERNAME,
              password: process.env.KAFKA_PASSWORD
            },
            ssl: true
          }
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [
    {
      provide: "KAFKA_PRODUCER",
      useFactory: (client: ClientKafka) => client.connect(),
      inject: ["KAFKA_SERVICE"]
    }
  ]
})
export class AppModule {
}