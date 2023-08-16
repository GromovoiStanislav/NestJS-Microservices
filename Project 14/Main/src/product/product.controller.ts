import { Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { EventPattern } from "@nestjs/microservices";

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

  @Post(":id/like")
  async like(@Param("id") id: number) {
    return this.productService.like(id);
  }


  @EventPattern("product_created")
  async productCreated(data: any) {
    await this.productService.create({
      id: data.id,
      title: data.title,
      image: data.image
    });
  }


  @EventPattern("product_updated")
  async productUpdated(data: any) {
    await this.productService.update(data.id, {
      title: data.title,
      image: data.image
    });
  }

  @EventPattern("product_liked")
  async productLiked(data: any) {
    await this.productService.update(data.id, {
      likes: data.likes
    });
  }


  @EventPattern("product_deleted")
  async productDeleted(id: number) {
    await this.productService.delete(id);
  }

}
