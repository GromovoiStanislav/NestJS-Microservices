import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MathService } from "./math.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MATH_SERVICE",
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [MathService]
})
export class AppModule {
}
