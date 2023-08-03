import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "mydb",
      username: "postgres",
      password: "root",
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductModule
  ]
})
export class AppModule {
}
