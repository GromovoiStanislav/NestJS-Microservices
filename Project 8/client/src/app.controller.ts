import { Controller, Logger, Post, Body, OnModuleInit, Inject } from "@nestjs/common";
import { IGrpcService } from "./grpc.interface";
import { Client, ClientGrpc, ClientProxyFactory, Transport, GrpcStreamCall } from "@nestjs/microservices";
import { join } from "path";
import { microserviceOptions } from "./grpc.options";
import { firstValueFrom, Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";

@Controller()
export class AppController implements OnModuleInit {

  private logger = new Logger("AppController");
  private grpcService: IGrpcService;

  // 1.
  // @Client(microserviceOptions)
  // private client: ClientGrpc;

  // 2.
  // private client: ClientGrpc;
  // constructor() {
  //   this.client = ClientProxyFactory.create({
  //     transport: Transport.GRPC,
  //     options: {
  //       package: "app",
  //       protoPath: join(__dirname, "../src/app.proto")
  //     }
  //   });
  // }

  // 3.
  constructor(
    @Inject("MATH_SERVICE") private readonly client: ClientGrpc
  ) {
  }

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>("AppController");
  }


  @Post("add")
  async accumulate(@Body("data") data: number[]) {
    this.logger.log("Adding " + data.toString());

    const metadata = new Metadata();
    //metadata.add('Set-Cookie', 'yummy_cookie=choco');
    metadata.set("XXX", "100");

    const res = await firstValueFrom(this.grpcService.addEvent({ data }, metadata));
    this.logger.log("addEvent", res);


    return this.grpcService.accumulate({ data });
  }


}
