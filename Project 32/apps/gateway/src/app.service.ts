import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AppService {

  private redisClient: ClientProxy;
  private tcpClient: ClientProxy;

  constructor(
    private configService: ConfigService
  ) {

    // @ts-ignore
    this.redisClient = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: configService.get<string>("REDIS_HOST") ?? "localhost",
        port: configService.get<number>("REDIS_PORT") ?? 6379,
        username: configService.get<string>("REDIS_USER") ?? "",
        password: configService.get<string>("REDIS_PASSWORD") ?? ""
      }
    });

    this.tcpClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 4000,
      },
    });

  }

  async onModuleInit() {
    await this.redisClient.connect();
  }

  async redisGetHello(name: string): Promise<string> {
    return firstValueFrom(this.redisClient.send<string>("getHello", name));
  }

  async tcpGetHello(name: string): Promise<string> {
    return firstValueFrom(this.tcpClient.send<string>("getHello", name));
  }

}
