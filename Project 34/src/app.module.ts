import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: "KAFKA",
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