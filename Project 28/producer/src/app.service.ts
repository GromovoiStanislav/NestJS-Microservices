import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, NatsRecordBuilder } from "@nestjs/microservices";
import * as nats from "nats";

@Injectable()
export class AppService {
  constructor(
    @Inject("CATS_SERVICE") private client: ClientProxy
  ) {
  }

  async getCatName(name: string) {
    // const message = await this.client.send({ cmd: "cats" }, name);
    // return message;


    const headers = nats.headers();
    // headers.set("x-version", "1.0.0");
    headers.set("x-token", "token");

    const record = new NatsRecordBuilder(name).setHeaders(headers).build();
    return this.client.send("cats.get", record);
  }

  async getEmoji() {
    const headers = nats.headers();
    headers.set("x-token", "token");

    const record = new NatsRecordBuilder().setHeaders(headers).build();
    return this.client.send("replace-emoji", record);
  }
}