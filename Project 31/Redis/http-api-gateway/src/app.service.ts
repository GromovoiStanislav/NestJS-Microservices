import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AppService {

  constructor(
    @Inject("GREETING_SERVICE") private client: ClientProxy
  ) {
  }

  async getHello() {
    return this.client.send({ cmd: "greeting" }, "Progressive Coder");
  }

  async getHelloAsync() {
    const message = await firstValueFrom(this.client.send({ cmd: "greeting-async" }, "Progressive Coder"));
    console.log(message);
    return message;
  }

  async publishEvent() {
    this.client.emit("book-created", { "bookName": "The Way Of Kings", "author": "Brandon Sanderson" });
  }
}