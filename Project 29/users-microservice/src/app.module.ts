import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./typeorm/entities/User";
import { Payment } from "./typeorm/entities/Payment";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      database: "nestjs_db",
      entities: [User, Payment],
      synchronize: true,
      username: "root",
      password: "root"
    }),
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}