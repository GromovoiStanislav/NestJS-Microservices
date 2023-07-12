import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { Message } from "./message.event";


@Controller()
export class AppController {

  constructor() {
  }

  @EventPattern("message_hello")
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data.text);
  }

  @MessagePattern("message_aloha")
  async getAloha() {
    return new Message("Aloha!");
  }
}
