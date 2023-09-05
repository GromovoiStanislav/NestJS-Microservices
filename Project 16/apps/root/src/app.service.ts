import { Injectable, OnModuleInit } from "@nestjs/common";
import { TrpcClientService } from "@app/common";

@Injectable()
export class AppService implements OnModuleInit {

  private trpcClient;

  constructor(
    private readonly trpcService: TrpcClientService
  ) {
  }

  onModuleInit() {
    this.trpcClient = this.trpcService.getTRPC("http://localhost:3001/trpc");
  }


  async getHello() {
    console.log(await this.trpcClient.hello.query({}));
    return "Hello World!";
  }

}
