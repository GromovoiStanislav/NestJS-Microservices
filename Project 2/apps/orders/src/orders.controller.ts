import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@app/common";
import { CreateOrderRequest } from "./dto/create-order.request";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService
  ) {
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() request: CreateOrderRequest,
    @Req() req: any
  ) {
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }


  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }


  // test RPC:

  @Get("order_test")
  async order_test() {
    return this.ordersService.order_test();
  }

  @Get("auth_test")
  async auth_test() {
    return this.ordersService.auth_test();
  }

  @Get("auth_test/:userId")
  async auth_test_userId(@Param("userId") userId: string) {
    return this.ordersService.auth_test(userId);
  }


  @Get("users_test")
  async users_test() {
    return this.ordersService.users_test();
  }


  @Get("users_test/:userId")
  async users_test_userId(@Param("userId") userId: string) {
    return this.ordersService.users_test_userId(userId);
  }

}