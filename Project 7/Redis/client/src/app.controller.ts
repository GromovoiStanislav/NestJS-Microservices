import { Controller, Logger, Post, Body } from "@nestjs/common";
import { MathService } from "./math.service";

@Controller()
export class AppController {

  private logger = new Logger("AppController");

  constructor(
    private mathService: MathService) {
  }

  @Post("add")
  async accumulate(@Body("data") data: number[]) {
    this.logger.log("Adding " + data.toString());
    return this.mathService.accumulate(data);
  }
}
