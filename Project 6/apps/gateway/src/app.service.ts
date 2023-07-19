import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class AppService {

  constructor(@Inject("MAIL_SERVICE") private clientMail: ClientProxy) {
  }

  getHello(): string {
    return "Hello World!";
  }

  newUser(data: any) {
    this.clientMail.emit("new_mail", data);
    return "send_queue";
  }

  accumulate(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.clientMail.send<number>(pattern, payload);
  }
}
