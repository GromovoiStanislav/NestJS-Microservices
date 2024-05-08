import { Delete, Get, OnModuleInit, Param, Patch } from "@nestjs/common";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientGrpc, RpcException } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { UpdateProductDto } from "../dto/update-product.dto";
import { CreateProductDto } from "../dto/create-product.dto";

interface ProductGrpcService {
  create(data: { name: string; price: number }): Observable<any>;

  findAll(data: {}): Observable<any>;

  findOne(data: { id: number }): Observable<any>;

  update(data: { id: number, name?: string; price?: number }): Observable<any>;

  delete(data: { id: number }): Observable<any>;
}

@Controller("product-grpc-clients")
export class ProductGrpcClientController implements OnModuleInit {

  private productGrpcService: ProductGrpcService;


  constructor(
    @Inject("PRODUCT_PACKAGE") private client: ClientGrpc) {
  }


  onModuleInit() {
    this.productGrpcService =
      this.client.getService<ProductGrpcService>("ProductService");
  }


  @Post()
  async create(@Body() data: CreateProductDto) {
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

  @Get(":id")
  async findOne(@Param("id") id: number) {
    try {
      return this.productGrpcService.findOne({ id });
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }


  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body()
      data: UpdateProductDto
  ) {
    try {
      return this.productGrpcService.update({ id, ...data });
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }


  @Delete(":id")
  async delete(@Param("id") id: number) {
    try {
      return this.productGrpcService.delete({ id });
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }

}