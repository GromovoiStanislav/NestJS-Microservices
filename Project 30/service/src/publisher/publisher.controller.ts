import { Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy, NatsRecordBuilder } from "@nestjs/microservices";
import * as nats from "nats";
import { firstValueFrom } from "rxjs";

@Controller('api')
export class PublisherController {

  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.natsClient.connect();
    console.log("Nats connected!");
  }

  @Post('hello')
  async hello(): Promise<string> {
    //const res = await this.natsClient.send("hello", "Hello World!").toPromise();

    const headers = nats.headers();
    headers.append("x-token", "token");
    headers.append('id', '123456');
    headers.append('unix_time', Date.now().toString());

    const record = new NatsRecordBuilder('massage hello').setHeaders(headers).build();
    const res = await firstValueFrom(this.natsClient.send("hello2", record));
    console.log("Respons:", res)

    return res;
  }

  @Post('notification')
  notifications(): string {
    // this.natsClient.emit("notifications", 'Hello');

    const headers = nats.headers();
    headers.set("x-token", "token");
    headers.set('id', '123456');
    headers.set('unix_time', Date.now().toString());

    const record = new NatsRecordBuilder('massage notification').setHeaders(headers).build();
    this.natsClient.emit("notification2", record);

    return 'notifications';
  }

}
