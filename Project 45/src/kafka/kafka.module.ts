import { Module } from "@nestjs/common";
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaController } from "./kafka.controller";

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
          },
          consumer: {
            groupId: "payments" + Math.random()
          }
        }
      }
    ])
  ],
  controllers: [KafkaController],
  providers: [
    {
      provide: "KAFKA_PRODUCER",
      useFactory: async (client: ClientKafka) => {
        return client.connect();
      },
      inject: ["KAFKA_SERVICE"]
    }
  ]
})
export class KafkaModule {
}