import { Controller } from '@nestjs/common';
import { RedisServiceService } from './redis-service.service';
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class RedisServiceController {

  constructor(
    private readonly redisServiceService: RedisServiceService
  ) {}

  @MessagePattern('getHello')
  getHello(@Payload() name: string): string {
    return this.redisServiceService.getHello(name);
  }

}
