import { Module } from "@nestjs/common";
import { HeroesController } from "./heroes/heroes.controller";

@Module({
  controllers: [HeroesController]
})
export class AppModule {
}