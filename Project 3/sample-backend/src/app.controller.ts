import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserRequest } from './create-user-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserRequest) {
    this.appService.createUser(createUserRequest);
    return { message: 'OK' };
  }

  @Get('analytics')
  getAnalytics() {
    return this.appService.getAnalytics();
  }

  @Get('communications')
  getUsers() {
    return this.appService.getCommunications();
  }

  @Get('hello/:name')
  getHelloCommunications(@Param('name') name: string) {
    return this.appService.getHelloCommunications(name);
  }
}
