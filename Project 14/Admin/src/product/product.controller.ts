import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./create-product.dto";
import { UpdateProductDto } from "./update-product.dto";


@Controller("products")
export class ProductController {

  constructor(
    private readonly productService: ProductService
  ) {
  }


  @Get()
  async getAll() {
    return this.productService.getAll();
  }


  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.productService.findOne(id);
  }


  @Post()
  async create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }


  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() data: UpdateProductDto
  ) {
    return this.productService.update(id, data);
  }


  @Post(":id/like")
  async like(@Param("id") id: number) {
    return this.productService.like(id);
  }


  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.productService.delete(id);
  }


}
