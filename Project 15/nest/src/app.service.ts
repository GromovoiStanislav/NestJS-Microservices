import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class AppService {

  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
  ) {}


  getHello(): string {
    return 'Hello World!';
  }

  accumulate(payload:number[]): Observable<number> {
    const pattern = { cmd: 'sum' };
    //const payload = [1, 2, 3, 4, 5];
    return this.client.send<number>(pattern, payload);
  }

}
