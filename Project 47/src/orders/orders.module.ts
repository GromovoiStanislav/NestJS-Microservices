import { Order } from "./entities/order.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    SequelizeModule.forFeature([Order]),
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
            groupId: "my-group-producer"
          }
        }
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: "KAFKA_PRODUCER",
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ["KAFKA_SERVICE"]
    }
  ]
})
export class OrdersModule {
}