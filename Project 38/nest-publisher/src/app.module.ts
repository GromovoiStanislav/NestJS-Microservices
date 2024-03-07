import { Module } from "@nestjs/common";
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from "./app.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: "KAFKA_SERVICE",
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
  providers: [
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: (client: ClientKafka) => client.connect(),
      inject: ['KAFKA_SERVICE'],
    },
  ]
})
export class AppModule {
}
