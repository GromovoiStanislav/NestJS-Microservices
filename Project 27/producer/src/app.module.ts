import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: "CATS_SERVICE",
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>("AMQP_URL")
            ],
            queue: "cats_queue",
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
  providers: [AppService],
})
export class AppModule {
}