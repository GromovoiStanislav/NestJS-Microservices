import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "node:path";
import { OrderController } from "./order.controller";
import { Order } from "./entity/order.entity";
import { OrderService } from "./order.service";
import { PRODUCT_SERVICE_NAME, PRODUCT_PACKAGE_NAME } from "./proto/product.pb";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: "0.0.0.0:50053",
          package: PRODUCT_PACKAGE_NAME,
          protoPath: join(__dirname, "./proto/product.proto")
        }
      }
    ]),
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {
}
