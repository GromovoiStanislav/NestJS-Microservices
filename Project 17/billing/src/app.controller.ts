import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
  ) {}

  @EventPattern('order_created') // topic
  handleOrderCreated(data: any) {
    console.log(data)
    this.appService.handleOrderCreated(data);
  }

}