import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: "ORDERS_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "orders",
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
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {
}
