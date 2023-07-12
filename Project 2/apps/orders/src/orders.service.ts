import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateOrderRequest } from "./dto/create-order.request";
import { OrdersRepository } from "./orders.repository";
import { AUTH_SERVICE, BILLING_SERVICE } from "./constants/services";

@Injectable()
export class OrdersService {

  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy
  ) {
  }


  async createOrder(request: CreateOrderRequest, authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit("order_created", {
          request,
          Authentication: authentication
        })
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }


  async getOrders() {
    return this.ordersRepository.find({});
  }


  // test RPC:

  async order_test() {
    return this.billingClient.send("order_test", {
      foo: "bar"
    });
  }

  async auth_test(userId: string | undefined = undefined) {
    if (userId) {
      return this.authClient.send("auth_test", { userId });
    }
    return this.authClient.send("auth_test", {});
  }

  async users_test() {
    return this.authClient.send({ cmd: "users_test" }, {});
  }

  users_test_userId(userId: string) {
    return this.authClient.send({ cmd: "users_test" }, { userId });
  }
}