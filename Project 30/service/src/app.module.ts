import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [PublisherModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {
}