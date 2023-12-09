import { Body, Controller, Post } from "@nestjs/common";
import { OrderDTO } from "./dto/order.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
  ) {
  }

  @Post()
  async createOrder(
    @Body() { customer, orderNo }: OrderDTO
  ) {
    return this.ordersService.create({ customer, orderNo });
  }
}