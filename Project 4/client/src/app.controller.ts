import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';
import { firstValueFrom, tap } from 'rxjs';

@Controller()
export class AppController {
  constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) {}

  @Get('hello')
  getHello() {
    this.client.emit('message_hello', new Message('Hello World'));
    return 'Hello World';
  }

  @Get('aloha')
  async getAloha() {
    const data = await firstValueFrom(
      this.client
        .send('message_aloha', {})
        .pipe(tap((data) => console.log(data)))
    );
    return data.text;
  }
}
