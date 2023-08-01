import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller('payment')
export class PaymentController {

  constructor(
    @Inject('TICKET_SERVICE') private ticketClient: ClientProxy
  ) {}


  @MessagePattern('doPayment')
  doPayment(data: any) {

    console.log(
      'ticket ordered, calling payment service now. paid base on this=',
      data,
    );

    // emit an event to ticket srevice
    this.ticketClient.emit('payment_sucess', { success: true });
    return { status: true };
  }

}
