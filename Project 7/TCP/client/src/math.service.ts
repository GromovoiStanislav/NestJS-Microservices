import { Inject, Injectable } from "@nestjs/common";
import { ClientProxyFactory, Client, Transport, ClientProxy } from "@nestjs/microservices";

@Injectable()
export class MathService {

  //private client: ClientProxy;

  // @Client({
  //   transport: Transport.TCP,
  //   options: {
  //     host: "127.0.0.1",
  //     port: 3001
  //   }
  // })
  // client: ClientProxy;

  constructor(
    @Inject("MATH_SERVICE") private readonly client: ClientProxy
  ) {

    // this.client = ClientProxyFactory.create({
    //   transport: Transport.TCP,
    //   options: {
    //     host: "127.0.0.1",
    //     port: 3001
    //   }
    // });
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  public accumulate(data: number[]) {
	this.client.emit('add-event', {data});
    return this.client.send<number, number[]>("add", data);
  }
}
