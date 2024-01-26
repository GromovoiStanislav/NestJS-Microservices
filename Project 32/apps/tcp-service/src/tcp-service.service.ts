import { Injectable } from '@nestjs/common';

@Injectable()
export class TcpServiceService {

  getHello(name: string): string {
    return `Hello ${name}!`;
  }

}
