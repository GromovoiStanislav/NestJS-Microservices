import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AppService implements OnModuleInit {

  constructor(
    @Inject("GREETING_SERVICE") private client: ClientKafka
  ) {
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf("greeting-async"); // greeting-async.reply
    this.client.subscribeToResponseOf("greeting"); // greeting.reply
    await this.client.connect();
    console.log("Kafka connected!");
  }

  async getHello() {
    return this.client.send("greeting", "Progressive Coder");
  }

  async getHelloAsync() {
    const message = await firstValueFrom(this.client.send("greeting-async", "Progressive Coder"));
    console.log(message);
    return message;
  }

  async publishEvent() {
    this.client.emit("book-created", { "bookName": "The Way Of Kings", "author": "Brandon Sanderson" });
  }
}