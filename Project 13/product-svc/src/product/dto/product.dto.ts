import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateProductRequest, DecreaseStockRequest, FindOneRequest } from "../product.pb";

export class FindOneRequestDto implements FindOneRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  id: number;
}

export class CreateProductRequestDto implements CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  stock: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  price: number;
}

export class DecreaseStockRequestDto implements DecreaseStockRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  id: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  orderId: number;
}
