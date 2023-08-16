import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { HttpService } from "@nestjs/axios";
import axios from "axios";


@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly httpService: HttpService
  ) {
  }


  async getAll(): Promise<Product[]> {
    return this.productModel.find();
  }


  async create(data): Promise<void> {
    await new this.productModel(data).save();
  }


  async update(id: number, data): Promise<void> {
    //await this.productModel.findOneAndUpdate({ id }, data);
    await this.productModel.updateOne({ id }, data);
  }


  async delete(id: number): Promise<void> {
    //await this.productModel.findOneAndDelete({ id });
    await this.productModel.deleteOne({ id });
  }

  async like(id: number): Promise<Product> {
    //this.httpService.post(`http://localhost:3000/api/products/${id}/like`, {}).subscribe()
    await axios.post(`http://localhost:3000/api/products/${id}/like`, {});
    return this.productModel.findOneAndUpdate({ id }, { $inc: { likes: 1 } }, { new: true });
  }
}
