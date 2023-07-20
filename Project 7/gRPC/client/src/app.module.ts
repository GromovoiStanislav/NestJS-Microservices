import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
  imports: [
    // 3.
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'app',
          protoPath: join(__dirname, '../src/app.proto'),
        },
      },
    ]),
 ],
  controllers: [AppController],
})
export class AppModule {
}
