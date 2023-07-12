import { Controller, UseGuards } from "@nestjs/common";
import { BillingService } from "./billing.service";
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { JwtAuthGuard, RmqService } from "@app/common";

@Controller()
export class BillingController {

  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService
  ) {
  }


  @EventPattern("order_created")
  @UseGuards(JwtAuthGuard)
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }


  // test RPC:

  @MessagePattern("order_test")
  async order_test(@Payload() data: any, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return { finish: data };
  }

}
