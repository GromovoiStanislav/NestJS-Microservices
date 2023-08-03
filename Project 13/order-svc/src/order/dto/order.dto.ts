import { IsNumber, Min } from "class-validator";
import { CreateOrderRequest } from "../proto/order.pb";

export class CreateOrderRequestDto implements CreateOrderRequest {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  userId: number;
}
