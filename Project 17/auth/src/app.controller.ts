import { Controller } from '@nestjs/common';
import {  MessagePattern } from "@nestjs/microservices";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_user') // topic
  getUser(data: any) {
    console.log(data)
    return this.appService.getUser(data);
  }
}