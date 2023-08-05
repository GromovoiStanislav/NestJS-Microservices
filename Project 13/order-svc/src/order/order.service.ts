import { HttpStatus, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientGrpc } from "@nestjs/microservices";
import { Repository } from "typeorm";
import { firstValueFrom } from "rxjs";
import { Order } from "./entity/order.entity";
import {
  FindOneResponse,
  DecreaseStockResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
  FindManyResponse
} from "./proto/product.pb";
import {
  FindOneResponse as FindOneResponseOrder,
  CreateOrderRequest,
  CreateOrderResponse,
  FindManyResponse as FindManyResponseOrder
} from "./proto/order.pb";
import { FindOneRequestDto } from "./dto/order.dto";

@Injectable()
export class OrderService implements OnModuleInit {

  private productSvc: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  onModuleInit(): void {
    this.productSvc = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }


  async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    const product: FindOneResponse = await firstValueFrom(this.productSvc.findOne({ id: data.productId }));

    if (product.status >= HttpStatus.NOT_FOUND) {
      return { id: null, error: ["Product not found"], status: product.status };
    } else if (product.data.stock < data.quantity) {
      return { id: null, error: ["Stock too less"], status: HttpStatus.CONFLICT };
    }

    const order: Order = new Order();
    order.price = product.data.price;
    order.quantity = data.quantity;
    order.productId = data.productId;
    order.userId = data.userId;

    //await this.repository.save(order);
    await order.save();

    const decreasedStockData: DecreaseStockResponse = await firstValueFrom(
      this.productSvc.decreaseStock({ id: data.productId, orderId: order.id, quantity: data.quantity })
    );

    if (decreasedStockData.status === HttpStatus.CONFLICT) {
      // deleting order if decreaseStock fails
      //await this.repository.delete(order.id);
      await order.remove();
      return { id: null, error: decreasedStockData.error, status: HttpStatus.CONFLICT };
    }

    return { id: order.id, error: null, status: HttpStatus.OK };
  }


  async findOne({ id }: FindOneRequestDto): Promise<FindOneResponseOrder> {
    const order: Order = await this.repository.findOne({ where: { id } });
    if (!order) {
      return { data: null, error: ["Order not found"], status: HttpStatus.NOT_FOUND };
    }

    const product: FindOneResponse = await firstValueFrom(this.productSvc.findOne({ id: order.productId }));

    const res = {
      id: order.id,
      productId: order.productId,
      product: product.data.name,
      quantity: order.quantity,
      userId: order.userId
    };

    return { data: res, error: null, status: HttpStatus.OK };
  }


  async getAll(): Promise<FindManyResponseOrder> {
    const orders: Order[] = await this.repository.find();

    const productIds = orders.map(order => order.productId);
    const products: FindManyResponse = await firstValueFrom(this.productSvc.findMany({ ids: productIds }));

    const res = orders.map(order => {
      const product = products.data.find(product=>product.id===order.productId)
      return {
        id: order.id,
        productId: order.productId,
        product: product.name,
        quantity: order.quantity,
        userId: order.userId
      };
    });


    return { data: res, error: null, status: HttpStatus.OK };
  }

}
