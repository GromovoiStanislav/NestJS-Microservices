import { IsNumber, Min } from "class-validator";
import { CreateOrderRequest, FindOneRequest } from "../proto/order.pb";

export class CreateOrderRequestDto implements CreateOrderRequest {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  userId: number;
}

export class FindOneRequestDto implements FindOneRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  id: number;
}