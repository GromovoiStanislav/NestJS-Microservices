import { Inject, Injectable } from "@nestjs/common";
import { ClientProxyFactory, Client, Transport, ClientProxy } from "@nestjs/microservices";

@Injectable()
export class MathService {

  //private client: ClientProxy;

  // @Client({
  //   transport: Transport.REDIS,
  //   options: {
  //     host: 'localhost',
  //     port: 6379,
  //   }
  // })
  // client: ClientProxy;

  constructor(
    @Inject("MATH_SERVICE") private readonly client: ClientProxy
  ) {

    // this.client = ClientProxyFactory.create({
    //   transport: Transport.REDIS,
    //   options: {
    //     host: 'localhost',
    //     port: 6379,
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
