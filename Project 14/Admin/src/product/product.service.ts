import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./create-product.dto";
import { ClientProxy } from "@nestjs/microservices";
import { UpdateProductDto } from "./update-product.dto";

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject("PRODUCT_SERVICE") private client: ClientProxy
  ) {
  }


  async onApplicationBootstrap() {
    try {
      await this.client.connect();
    } catch (e) {
      console.log(e);
    }
  }


  async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }


  async create(data: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.save(data);
    this.client.emit("product_created", product);
    return product;
  }


  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }


  async update(id: number, data: UpdateProductDto) {
    await this.productRepository.update(id, data);
    const product = await this.productRepository.findOneBy({ id });
    this.client.emit("product_updated", product);
    return product;

    // let product = await this.productRepository.findOneBy({ id });
    // this.productRepository.merge(product, data);
    // product = await this.productRepository.save(product);
    // this.client.emit('product_updated', product);
    // return product;
  }


  async like(id: number) {
    let product = await this.productRepository.findOneBy({ id });
    product.likes++;
    product = await this.productRepository.save(product);
    this.client.emit("product_liked", {
      id: product.id,
      likes: product.likes
    });
    return product;
  }


  async delete(id: number) {
    // const result = await this.productRepository.delete(id);
    //this.client.emit("product_deleted", id);
    // return result;

    let product = await this.productRepository.findOneBy({ id });
    product = await this.productRepository.remove(product);
    this.client.emit("product_deleted", id);
    return product;
  }

}
