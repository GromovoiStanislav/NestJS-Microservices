import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AppController {

  @MessagePattern({cmd: 'greeting'})
  getGreetingMessage(@Payload() name: string): string {
    return `Hello ${name}`;
  }

  @MessagePattern({cmd: 'greeting-async'})
  async getGreetingMessageAysnc(@Payload() name: string): Promise<string> {
    return `Hello ${name}`;
  }

  @EventPattern('book-created')
  async handleBookCreatedEvent(@Payload() data: Record<string, unknown>) {
    console.log(data);
  }
}