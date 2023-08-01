import { Controller, Get, Post } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { TicketService } from "./ticket.service";

@Controller("ticket")
export class TicketController {

  constructor(
    private ticketService: TicketService
  ) {
  }


  @Get()
  get() {
    return [];
  }


  @Post()
  async orderTicket() {
    return this.ticketService.orderTicket();
  }


  @EventPattern("payment_sucess")
  paymentSucess(data: unknown) {
    console.log("event emit from payment service:", data);
  }

}
