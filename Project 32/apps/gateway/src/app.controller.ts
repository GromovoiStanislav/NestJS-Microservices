import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService
  ) {
  }

  @Get("redis/:name")
  async redisGetHello(@Param("name") name: string): Promise<string> {
    return await this.appService.redisGetHello(name);
  }

  @Get("tcp/:name")
  async tcpGetHello(@Param("name") name: string): Promise<string> {
    return await this.appService.tcpGetHello(name);
  }
}
