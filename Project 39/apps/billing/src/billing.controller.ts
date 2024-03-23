import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";


@Controller()
export class BillingController {

  @MessagePattern({ cmd: "payment" })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    return `Hello ${name} Async`;
  }

}