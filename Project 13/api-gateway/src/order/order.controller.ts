import { Controller, Inject, Post, OnModuleInit, UseGuards, Req, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateOrderResponse,
  OrderServiceClient,
  ORDER_SERVICE_NAME,
  CreateOrderRequest,
  FindOneResponse, FindManyResponse
} from "./proto/order.pb";
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';


@Controller('order')
export class OrderController implements OnModuleInit {

  private svc: OrderServiceClient;


  @Inject(ORDER_SERVICE_NAME)
  private readonly client: ClientGrpc;


  onModuleInit(): void {
    this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }


  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@Req() req: Request): Promise<Observable<CreateOrderResponse>> {
    const body: CreateOrderRequest = req.body;
    body.userId = <number>req['user'];
    return this.svc.createOrder(body);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Observable<FindOneResponse>> {
    return this.svc.findOne({ id });
  }


  @Get()
  @UseGuards(AuthGuard)
  async getAll(): Promise<Observable<FindManyResponse>> {
    return this.svc.getAll({});
  }

}
