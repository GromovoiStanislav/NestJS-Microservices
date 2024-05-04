import { Get, OnModuleInit, Param } from "@nestjs/common";
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface ProductGrpcService {
  create(data: { name: string; price: number }): Observable<any>;
  findAll(data:{}): Observable<any>;
  findOne(data:{id: number}): Observable<any>;
}

@Controller('product-grpc-clients')
export class ProductGrpcClientController implements OnModuleInit {

  private productGrpcService: ProductGrpcService;


  constructor(
    @Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}


  onModuleInit() {
    this.productGrpcService =
      this.client.getService<ProductGrpcService>('ProductService');
  }


  @Post()
  async create(@Body() data) {
    try {
      return this.productGrpcService.create(data);
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }


  @Get()
  async findAll() {
    try {
      return this.productGrpcService.findAll({});
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return this.productGrpcService.findOne({id});
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }

}