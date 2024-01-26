import { Controller } from "@nestjs/common";
import { TcpServiceService } from "./tcp-service.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class TcpServiceController {

  constructor(
    private readonly tcpServiceService: TcpServiceService
  ) {
  }

  @MessagePattern("getHello")
  getHello(@Payload() name: string): string {
    return this.tcpServiceService.getHello(name);
  }

}
