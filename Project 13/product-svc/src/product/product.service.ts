import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entity/product.entity";
import { CreateProductRequestDto, DecreaseStockRequestDto, FindOneRequestDto } from "./dto/product.dto";
import { CreateProductResponse, DecreaseStockResponse, FindManyResponse, FindOneResponse } from "./proto/product.pb";
import { StockDecreaseLog } from "./entity/stock-decrease-log.entity";


@Injectable()
export class ProductService {

  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  @InjectRepository(StockDecreaseLog)
  private readonly decreaseLogRepository: Repository<StockDecreaseLog>;


  async findOne({ id }: FindOneRequestDto): Promise<FindOneResponse> {
    const product: Product = await this.repository.findOne({ where: { id } });
    if (!product) {
      return { data: null, error: ["Product not found"], status: HttpStatus.NOT_FOUND };
    }
    return { data: product, error: null, status: HttpStatus.OK };
  }


  async getAll(): Promise<FindManyResponse> {
    const products: Product[] = await this.repository.find();
    return { data: products, error: null, status: HttpStatus.OK };
  }


  async createProduct(payload: CreateProductRequestDto): Promise<CreateProductResponse> {
    const product: Product = new Product();
    product.name = payload.name;
    product.sku = payload.sku;
    product.stock = payload.stock;
    product.price = payload.price;
    await this.repository.save(product);
    return { id: product.id, error: null, status: HttpStatus.OK };
  }


  async decreaseStock({ id, orderId, quantity }: DecreaseStockRequestDto): Promise<DecreaseStockResponse> {
    const product: Product = await this.repository.findOne({ where: { id }, select: ["id", "stock"] });

    if (!product) {
      return { error: ["Product not found"], status: HttpStatus.NOT_FOUND };
    } else if (product.stock <= 0) {
      return { error: ["Stock too low"], status: HttpStatus.CONFLICT };
    }

    const isAlreadyDecreased: number = await this.decreaseLogRepository.count({ where: { orderId } });

    if (isAlreadyDecreased) {
      // Idempotence
      return { error: ["Stock already decreased"], status: HttpStatus.CONFLICT };
    }

    await this.repository.update(product.id, { stock: product.stock - quantity });
    await this.decreaseLogRepository.insert({ product, orderId });

    return { error: null, status: HttpStatus.OK };
  }

}
