import { Injectable } from "@nestjs/common";

@Injectable()
export class RedisServiceService {

  getHello(name: string): string {
    return `Hello ${name}!`;
  }

}
