import { Module } from "@nestjs/common";
import { PaymentsModule } from "./payments/payments.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./typeorm/entities/Payment";
import { User } from "./typeorm/entities/User";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      database: "nestjs_db",
      entities: [Payment, User],
      synchronize: true,
      username: "root",
      password: "root"
    }),
    PaymentsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}