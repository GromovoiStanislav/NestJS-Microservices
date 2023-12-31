import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProductRequestDto,
  FindOneRequestDto,
  DecreaseStockRequestDto,
  FindManyRequestDto
} from "./dto/product.dto";
import {
  CreateProductResponse,
  FindOneResponse,
  PRODUCT_SERVICE_NAME,
  DecreaseStockResponse,
  FindManyResponse
} from "./proto/product.pb";
import { ProductService } from './product.service';


@Controller()
export class ProductController {

  @Inject(ProductService)
  private readonly service: ProductService;


  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  private createProduct(payload: CreateProductRequestDto): Promise<CreateProductResponse> {
    return this.service.createProduct(payload);
  }


  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.service.findOne(payload);
  }


  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindMany')
  private findMany(payload: FindManyRequestDto): Promise<FindManyResponse> {
    return this.service.findMany(payload);
  }


  @GrpcMethod(PRODUCT_SERVICE_NAME, 'GetAll')
  private getAll(): Promise<FindManyResponse> {
    return this.service.getAll();
  }


  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DecreaseStock')
   private decreaseStock(payload: DecreaseStockRequestDto): Promise<DecreaseStockResponse> {
    return this.service.decreaseStock(payload);
  }

}
