import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MathService } from "./math.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MATH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 3001
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [MathService]
})
export class AppModule {
}
