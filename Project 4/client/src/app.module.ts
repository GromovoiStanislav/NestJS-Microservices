import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
  imports: [
    ClientsModule.register([
      {
        name: "HELLO_SERVICE", transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: "messages_queue",
          queueOptions: {
            durable: false
          },
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {
}
