import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateProductRequest, DecreaseStockRequest, FindManyRequest, FindOneRequest } from "../proto/product.pb";

export class FindOneRequestDto implements FindOneRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  id: number;
}


export class FindManyRequestDto implements FindManyRequest {
  @IsArray()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  ids: number[];
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

  @IsNumber({ allowInfinity: false, allowNaN: false })
  quantity: number;
}
