import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}



  @EventPattern('order_created') // topic
  handleOrderCreated(data: any) {
    console.log(data)
    this.appService.handleOrderCreated(data);
  }

  onModuleInit() {
    //this.authClient.subscribeToResponseOf('get_user');
  }
}