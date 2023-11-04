import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import {  ConfigService } from "@nestjs/config";

@Module({
  controllers: [OrdersController],
  imports: [


    ClientsModule.registerAsync([
      {
        name: "NOTIFICATION_SERVICE",
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>("REDIS_HOST") ?? "localhost",
            port: configService.get<number>("REDIS_PORT") ?? 6379,
            username: configService.get<string>("REDIS_USER") ?? "",
            password: configService.get<string>("REDIS_PASSWORD") ?? ""
          }
        }),
        inject: [ConfigService],
        imports: []
      }
    ])
  ],
})
export class OrdersModule {}