import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import {  ConfigService } from "@nestjs/config";
import { OrdersService } from "./orders.service";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [

    ClientsModule.registerAsync([
      {
        name: "NOTIFICATION_SERVICE",
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>("AMQP_URL"),
            ],
            queue: 'notification_queue',
            queueOptions: {
              durable: false,
            },
          }
        }),
        inject: [ConfigService],
        imports: []
      }
    ])
  ],
})
export class OrdersModule {}