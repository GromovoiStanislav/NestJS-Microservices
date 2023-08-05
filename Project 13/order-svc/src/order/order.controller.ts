import { Controller, Inject } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { OrderService } from "./order.service";
import { ORDER_SERVICE_NAME, CreateOrderResponse, FindOneResponse, FindManyResponse } from "./proto/order.pb";
import { CreateOrderRequestDto, FindOneRequestDto } from "./dto/order.dto";

@Controller()
export class OrderController {

  @Inject(OrderService)
  private readonly service: OrderService;


  @GrpcMethod(ORDER_SERVICE_NAME, "CreateOrder")
  private async createOrder(data: CreateOrderRequestDto): Promise<CreateOrderResponse> {
    return this.service.createOrder(data);
  }


  @GrpcMethod(ORDER_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.service.findOne(payload);
  }


  @GrpcMethod(ORDER_SERVICE_NAME, 'GetAll')
  private getAll(): Promise<FindManyResponse> {
    return this.service.getAll();
  }

}
