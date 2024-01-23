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
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>("REDIS_HOST") ?? "localhost",
            port: configService.get<number>("REDIS_PORT") ?? 6379,
            username: configService.get<string>("REDIS_USER") ?? "",
            password: configService.get<string>("REDIS_PASSWORD") ?? ""
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