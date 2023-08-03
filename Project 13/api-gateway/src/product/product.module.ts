import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "node:path";
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from "./proto/product.pb";
import { ProductController } from "./product.controller";

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
    ])
  ],
  controllers: [ProductController]
})
export class ProductModule {
}
