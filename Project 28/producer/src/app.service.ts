import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, NatsRecordBuilder } from "@nestjs/microservices";
import * as nats from "nats";
import { Cat } from "./dto/cat.dto";

@Injectable()
export class AppService {
  constructor(
    @Inject("CATS_SERVICE") private client: ClientProxy
  ) {
  }

  async getCatName(cat: Cat) {
    // const message = await this.client.send({ cmd: "cats" }, cat.name);
    // return message;


    const headers = nats.headers();
    // headers.set("x-version", "1.0.0");
    headers.set("x-token", "token");

    const record = new NatsRecordBuilder(cat).setHeaders(headers).build();
    return this.client.send("cats.get", record);
  }

  async getEmoji() {
    const headers = nats.headers();
    headers.set("x-token", "token");

    const record = new NatsRecordBuilder().setHeaders(headers).build();
    return this.client.send("replace-emoji", record);
  }
}