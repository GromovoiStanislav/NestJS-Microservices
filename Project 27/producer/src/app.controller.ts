import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { Cat } from "./dto/cat.dto";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {
  }

  @Post("/cats")
  async sendCatData(@Body() body: Cat) {
    return this.appService.getCatName(body.name);
  }
}