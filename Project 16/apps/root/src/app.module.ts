import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from "@app/common";

@Module({
  imports:[TrpcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
