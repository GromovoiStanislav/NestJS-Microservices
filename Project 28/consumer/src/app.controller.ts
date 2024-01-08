import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, NatsContext, Payload } from "@nestjs/microservices";

@Controller()
export class AppController {

  //@MessagePattern({ cmd: "cats" })
  @MessagePattern("cats.*")
  async getCatName(@Payload() name: string, @Ctx() context: NatsContext): Promise<string> {
    console.log(`Subject: ${context.getSubject()}`); // Subject: {"cmd":"cats"}

    const headers = context.getHeaders();
    console.log(`Headers: ${headers}`);
    console.log(headers.get("x-version"));
    console.log(headers.get("x-token"));

    return `Cat name: ${name}`;
  }


  @MessagePattern('replace-emoji')
  replaceEmoji(@Payload() data: string, @Ctx() context: NatsContext): string {
    const headers = context.getHeaders();
    return headers['x-version'] === '1.0.0' ? '🐱' : '🐈';
  }
}
