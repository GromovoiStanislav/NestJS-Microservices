import { Controller, Inject, Post, OnModuleInit, UseGuards, Req, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom, Observable } from "rxjs";
import {
  CreateOrderResponse,
  OrderServiceClient,
  ORDER_SERVICE_NAME,
  CreateOrderRequest,
  FindOneResponse, FindManyResponse
} from "./proto/order.pb";
import { AuthGuard } from "../auth/auth.guard";
import { Request } from "express";
import { AuthService } from "../auth/auth.service";
import { FindOneData as FindOneDataUser } from "../auth/proto/auth.pb";


@Controller("order")
export class OrderController implements OnModuleInit {

  private svc: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly client: ClientGrpc;


  @Inject(AuthService)
  private readonly authService: AuthService;


  onModuleInit(): void {
    this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }


  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@Req() req: Request): Promise<Observable<CreateOrderResponse>> {
    const body: CreateOrderRequest = req.body;
    body.userId = <number>req["user"];
    return this.svc.createOrder(body);
  }


  // @Get(":id")
  // @UseGuards(AuthGuard)
  // async findOne(@Param("id", ParseIntPipe) id: number): Promise<Observable<FindOneResponse>> {
  //   return this.svc.findOne({ id });
  // }

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<FindOneResponse> {
    const order: FindOneResponse = await firstValueFrom(this.svc.findOne({ id }));
    const user: FindOneDataUser = (await this.authService.findOne(order.data.userId)).data;
    order.data.user = user.email;
    return order;
  }


  // @Get()
  // @UseGuards(AuthGuard)
  // async getAll(): Promise<Observable<FindManyResponse>> {
  //   return this.svc.getAll({});
  // }

  @Get()
  @UseGuards(AuthGuard)
  async getAll(): Promise<FindManyResponse> {
    const orders: FindManyResponse = await firstValueFrom(this.svc.getAll({}));
    const userIds = orders.data.map(order => order.userId);
    const users: FindOneDataUser[] = (await this.authService.findMany(userIds)).data;

    orders.data.forEach(order => {
      order.user = users.find(user => user.id === order.userId).email;
    });
    return orders;
  }

}
