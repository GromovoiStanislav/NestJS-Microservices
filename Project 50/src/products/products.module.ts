import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "node:path";
import { ProductGrpcServerController } from "./product-grpc-server/product-grpc-server.controller";
import { ProductGrpcClientController } from "./product-grpc-client/product-grpc-client.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: 'product',
          protoPath: join(__dirname, 'proto/product.proto'),
        },
      },
    ]),
  ],
  controllers: [
    ProductsController,
    ProductGrpcServerController,
    ProductGrpcClientController,
  ],
  providers: [ProductsService]
})
export class ProductsModule {
}