import { Module } from "@nestjs/common";
import { join } from "node:path";
import { Order } from "./orders/entities/order.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrdersModule } from "./orders/orders.module";


@Module({
  imports: [
    OrdersModule,
    // SequelizeModule.forRoot({
    //   dialect: "sqlite",
    //   host: join(__dirname, "../database.sqlite"),
    //   models: [Order],
    //   synchronize: true,
    //   autoLoadModels: true
    // }),
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      database: "fin",
      username: "root",
      password: "root",
      models: [Order],
      autoLoadModels: true
    })
  ]
})
export class AppModule {
}
