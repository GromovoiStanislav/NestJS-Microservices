import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "node:path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USERS_SERVICE",
        transport: Transport.GRPC,
        options: {
          package: "users",
          protoPath: join(__dirname, "proto/users.proto")
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
