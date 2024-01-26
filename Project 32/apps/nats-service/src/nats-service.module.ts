import { Module } from '@nestjs/common';
import { NatsServiceController } from './nats-service.controller';
import { NatsServiceService } from './nats-service.service';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [NatsServiceController],
  providers: [NatsServiceService],
})
export class NatsServiceModule {}
