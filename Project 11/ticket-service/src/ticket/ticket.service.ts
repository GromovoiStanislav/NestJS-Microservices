import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class TicketService {

  constructor(
    @Inject("PAYMENT_SERVICE") private paymentClient: ClientProxy
  ) {
  }


  orderTicket() {

    const ticketObj = {
      id: 1,
      price: 200
    };

    // call payment service
    return lastValueFrom(this.paymentClient.send("doPayment", ticketObj));
  }
}

