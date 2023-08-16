import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.registerAsync([
      {
        name: "PRODUCT_SERVICE",
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("AMQP_URL")],
            queue: "product_queue",
            queueOptions: {
              durable: false
            }
          }
        }),
        inject: [ConfigService],
        imports: []
      }
    ])
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {
}
