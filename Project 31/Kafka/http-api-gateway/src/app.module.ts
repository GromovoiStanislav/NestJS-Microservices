import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Partitioners } from "kafkajs";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: "GREETING_SERVICE",
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: "posts",
              brokers: [configService.get<string>("KAFKA_HOSTNAME")],
              ssl: true,
              sasl: {
                mechanism: "scram-sha-256",
                username: configService.get<string>("KAFKA_USERNAME"),
                password: configService.get<string>("KAFKA_PASSWORD")
              }
            },
            producer: {
              createPartitioner: Partitioners.LegacyPartitioner // Используем старый разделитель
            },
            consumer: {
              groupId: "posts-consumer"
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