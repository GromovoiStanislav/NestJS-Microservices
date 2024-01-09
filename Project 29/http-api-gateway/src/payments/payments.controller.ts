import { Controller, Inject, Post, Body } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Controller("payments")
export class PaymentsController {

  constructor(
    @Inject("NATS_SERVICE") private natsClient: ClientProxy
  ) {
  }

  @Post()
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    this.natsClient.emit("createPayment", createPaymentDto);
  }
}