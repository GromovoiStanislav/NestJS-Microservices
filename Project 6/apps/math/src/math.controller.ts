import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { MathService } from "./math.service";

@Controller()
export class MathController {

  constructor(
    private readonly mathService: MathService
  ) {
  }

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b);
  }

}
