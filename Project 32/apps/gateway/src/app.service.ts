import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AppService {

  private redisClient: ClientProxy;
  private tcpClient: ClientProxy;
  private natsClient: ClientProxy;

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
        port: configService.get<number>("TCP_PORT") ?? 3001
      }
    });

    this.natsClient = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        url: configService.get<number>("NATS_URL") ?? "nats://localhost:4222"
      }
    });

  }

  async onModuleInit() {
    await this.redisClient.connect();
    await this.tcpClient.connect();
    await this.natsClient.connect();
  }

  async redisGetHello(name: string): Promise<string> {
    return firstValueFrom(this.redisClient.send<string>({ cmd: "getHello" }, name));
  }

  async tcpGetHello(name: string): Promise<string> {
    return firstValueFrom(this.tcpClient.send<string>({ cmd: "getHello" }, name));
  }

  async natsGetHello(name: string): Promise<string> {
    return firstValueFrom(this.natsClient.send<string>({ cmd: "getHello" }, name));
  }

}
