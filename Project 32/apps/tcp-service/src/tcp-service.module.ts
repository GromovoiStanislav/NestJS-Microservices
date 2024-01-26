import { Module } from "@nestjs/common";
import { TcpServiceController } from "./tcp-service.controller";
import { TcpServiceService } from "./tcp-service.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [
    TcpServiceController
  ],
  providers: [
    TcpServiceService
  ]
})
export class TcpServiceModule {
}
