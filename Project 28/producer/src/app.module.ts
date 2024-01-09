import { Module } from "@nestjs/common";
// import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { NatsModule } from "./nats/nats.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // ClientsModule.register([
    //   {
    //     name: "CATS_SERVICE",
    //     transport: Transport.NATS,
    //     options: {
    //       servers: ["nats://localhost:4222"],
    //       headers: { 'x-version': '1.0.0' },
    //     }
    //   }
    // ])
    NatsModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}