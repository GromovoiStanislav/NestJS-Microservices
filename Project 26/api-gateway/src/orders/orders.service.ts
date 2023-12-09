import { Inject, Injectable } from "@nestjs/common";
import { OrderDTO } from "./dto/order.dto";
import { ClientProxy } from "@nestjs/microservices";


@Injectable()
export class OrdersService {

  constructor(
    @Inject("NOTIFICATION_SERVICE") private client: ClientProxy
  ) {
  }


  orders = [];

  create(order: OrderDTO) {
    this.client.emit("order_created", { customer: order.customer, orderNo: order.orderNo });
    this.orders.push(order);
    return order;
  }
}