import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";


@Controller()
export class AppController {

  constructor(
    @Inject("BILLING") private client: ClientProxy
  ) {
  }

  @Get("payment")
  async payment() {
    const message = await this.client.send({ cmd: "payment" }, "Progressive Coder");
    return message;
  }
}
