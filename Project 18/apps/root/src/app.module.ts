import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { Partitioners } from "kafkajs";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ClientsModule.registerAsync([
      {
        name: "USERS_SERVICE",
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [configService.get<string>("KAFKA_HOSTNAME")],
              ssl: true,
              sasl: {
                mechanism: "scram-sha-256",
                username: configService.get<string>("KAFKA_USERNAME"),
                password: configService.get<string>("KAFKA_PASSWORD")
              }
            },
            producer:{
              createPartitioner: Partitioners.LegacyPartitioner, // Используем старый разделитель
            },
            consumer: {
              groupId: 'users-consumer',
            },
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
