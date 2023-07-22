import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MathService } from "./math.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    // 1-й способ
    ClientsModule.register([
      {
        name: "MATH_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: "multicasting_tasks"
          // queue: 'tasks',
          // queueOptions: {
          //   durable: false
          // },
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [MathService]
})
export class AppModule {
}
