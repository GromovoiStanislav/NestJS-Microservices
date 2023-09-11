import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-request.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');//get_user.reply topic
    await this.authClient.connect();
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      .subscribe((user) => {
        console.log(user)
        console.log(
          `Billing user with stripe ID ${user.stripeUserId} a price of $${orderCreatedEvent.price}...`,
        );
      });

  }

}