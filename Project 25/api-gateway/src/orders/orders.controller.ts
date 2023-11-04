import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { OrderDTO } from "./dto/order.dto";

@Controller("orders")
export class OrdersController {

  constructor(
    @Inject("NOTIFICATION_SERVICE") private client: ClientProxy
  ) {
  }

  @Post()
  async createOrder(
    @Body() { customer, orderNo }: OrderDTO
  ) {
    this.client.emit("order_created", { customer, orderNo });
    return {
      customer,
      orderNo
    };
  }
}