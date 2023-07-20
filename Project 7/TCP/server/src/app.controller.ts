import { Controller, Logger } from "@nestjs/common";
import { MathService } from "./math.service";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {

  private logger = new Logger('AppController');

  constructor(
    private mathService: MathService
  ) {
  }

  @MessagePattern('add')
  async accumulate(data: number[]) {
    this.logger.log('Adding ' + data.toString());
    return this.mathService.accumulate(data);
  }

  @EventPattern('add-event')
  async handleUserCreated(data: Record<string, unknown>) {
    console.log('Event ' + JSON.stringify(data));
  }
  
}