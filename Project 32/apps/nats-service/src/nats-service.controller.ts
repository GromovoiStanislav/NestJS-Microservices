import { Controller } from "@nestjs/common";
import { NatsServiceService } from "./nats-service.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class NatsServiceController {

  constructor(
    private readonly natsServiceService: NatsServiceService
  ) {}

  @MessagePattern({ cmd: "getHello" })
  getHello(@Payload() name: string): string {
    return this.natsServiceService.getHello(name);
  }
}
