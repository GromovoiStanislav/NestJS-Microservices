import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ClientsModule.registerAsync([
      {
        name: "GREETING_SERVICE",
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>("AMQP_URL")
            ],
            queue: "greeting_queue",
            queueOptions: {
              durable: false
            }
          }
        }),
        inject: [ConfigService],
        imports: []
      }
    ])

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}