import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

//import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "ORDERS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: "orders-queue"
        }
      }
    ]),

    // ClientsModule.registerAsync([
    //   {
    //     name: "ORDERS_SERVICE",
    //     useFactory: (configService: ConfigService) => ({
    //       transport: Transport.RMQ,
    //       options: {
    //         urls: [
    //           configService.get<string>("AMQP_URL")
    //         ],
    //         queue: "orders-queue",
    //       }
    //     }),
    //     inject: [ConfigService],
    //     imports: []
    //   }
    // ])

  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {
}

console.log(process.env.AMQP_URL);