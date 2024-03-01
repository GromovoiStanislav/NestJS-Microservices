import { Module } from "@nestjs/common";
import { HeroController } from "./hero.controller";
import { VehicleController } from "./vehicle.controller";

@Module({
  controllers: [
    HeroController,
    VehicleController
  ]
})
export class AppModule {
}