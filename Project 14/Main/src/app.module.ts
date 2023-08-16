import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot("mongodb://localhost:27017/test"),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
