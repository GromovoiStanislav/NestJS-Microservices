import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(
    @Inject("CATS_SERVICE") private client: ClientProxy
  ) {
  }

  async getCatName(name: string) {
    const message = await this.client.send({ cmd: "cats" }, name);
    return message;
  }
}