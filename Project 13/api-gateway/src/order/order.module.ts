import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from "node:path";
import { ORDER_SERVICE_NAME, ORDER_PACKAGE_NAME } from './proto/order.pb';
import { OrderController } from './order.controller';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: ORDER_PACKAGE_NAME,
          protoPath: join(__dirname, "./proto/order.proto")
        },
      },
    ]),
    AuthModule
  ],
  controllers: [OrderController],
})
export class OrderModule {}
