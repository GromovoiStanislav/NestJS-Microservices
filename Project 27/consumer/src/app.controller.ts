import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
  @MessagePattern({ cmd: "cats" })
  async getCatName(name: string): Promise<string> {
    return `Cat name: ${name}`;
  }
}