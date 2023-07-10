import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user_created')
  handleUserCreated(data: CreateUserDto) {
    this.appService.handleUserCreated(data);
  }

  @MessagePattern({ cmd: 'get_communications' })
  getCommunications() {
    return this.appService.getCommunications();
  }

  @MessagePattern({ cmd: 'get_hello' })
  getHello(data: { name: string }) {
    const { name } = data;
    return this.appService.getHello(name);
  }
}
