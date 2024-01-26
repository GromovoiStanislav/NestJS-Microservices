import { Module } from "@nestjs/common";
import { RedisServiceController } from "./redis-service.controller";
import { RedisServiceService } from "./redis-service.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [
    RedisServiceController
  ],
  providers: [
    RedisServiceService
  ]
})
export class RedisServiceModule {
}
