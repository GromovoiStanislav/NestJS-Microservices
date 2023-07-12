import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AppService {
  private readonly communications: any[] = [];

  getHello(name: string): string {
    return `Hello World ${name} from COMMUNICATIONS!`;
  }

  handleUserCreated(data: CreateUserDto) {
    console.log('handlerUserCreated - COMMUNICATIONS', data);
    // TODO: Email the user...
    this.communications.push({
      email: data.email,
      timestamp: new Date(),
    });
  }

  getCommunications() {
    return this.communications;
  }
}
