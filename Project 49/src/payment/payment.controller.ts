import { Controller, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";


@Controller()
export class PaymentController implements OnModuleInit {

  constructor(
    @Inject("KAFKA_SERVICE")
    private clientKafka: ClientKafka
  ) {
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf("validate-something");
  }

  @MessagePattern("payments")
  consumePayment(@Payload() message) {

    console.log(message);

    this.clientKafka.send(
      "validate-something",
      JSON.stringify({ key1: "val1" })
    ).subscribe(reply => console.log(reply));

  }
}
