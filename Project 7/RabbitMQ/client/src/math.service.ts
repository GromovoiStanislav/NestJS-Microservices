import { Inject, Injectable } from "@nestjs/common";
import { ClientProxyFactory, Client, Transport, ClientProxy } from "@nestjs/microservices";

@Injectable()
export class MathService {


  // 2-й способ
  // @Client({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.AMQP_URL],
  //     queue: "multicasting_tasks"
  //     // queue: 'tasks',
  //     // queueOptions: {
  //     //   durable: false
  //     // },
  //   }
  // })
  // client: ClientProxy;



  // 1-й способ
  constructor(
    @Inject("MATH_SERVICE") private readonly client: ClientProxy
  ) {
  }



  // 3-й способ
  // private client: ClientProxy;
  //
  // constructor() {
  //   this.client = ClientProxyFactory.create({
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: [process.env.AMQP_URL],
  //       queue: "multicasting_tasks"
  //       // queue: 'tasks',
  //       // queueOptions: {
  //       //   durable: false
  //       // },
  //     }
  //   });
  // }


  async onApplicationBootstrap() {
    await this.client.connect();
  }


  public accumulate(data: number[]) {
    this.client.emit("add-event", { data });
    return this.client.send<number, number[]>("add", data);
  }


}
