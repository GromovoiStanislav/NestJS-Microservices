import { Injectable } from '@nestjs/common';

@Injectable()
export class NatsServiceService {

  getHello(name: string): string {
    return `Hello ${name}!`;
  }

}
