import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user_created')
  handleUserCreated(
    @Payload() data: CreateUserDto,
    @Ctx() context: RmqContext
  ) {
    this.appService.handleUserCreated(data);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }

  @MessagePattern({ cmd: 'get_communications' })
  getCommunications(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return this.appService.getCommunications();
  }

  @MessagePattern({ cmd: 'get_hello' })
  getHello(@Payload() data: { name: string }, @Ctx() context: RmqContext) {
    const { name } = data;

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return this.appService.getHello(name);
  }
}
