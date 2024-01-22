import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, MessagePattern, NatsContext, Payload } from "@nestjs/microservices";

@Controller()
export class AppController {


  @MessagePattern("hello")
  async getHello(@Payload() data: string, @Ctx() context: NatsContext) {
    console.log("Hello:", data);

    try {
      const { headers: mapHeaders } = context.getHeaders();
      const headers = Object.fromEntries(mapHeaders);
      console.log("headers", headers);
      console.log("id", headers["id"]);
      console.log("unix_time", headers["unix_time"]);
    } catch (e) {

    }

    return "Hello World!";
  }


  @EventPattern("notification")
  paymentCreated(@Payload() data: any, @Ctx() context: NatsContext) {
    console.log("Notifications:", data);

    try {
      const { headers: mapHeaders } = context.getHeaders();
      const headers = Object.fromEntries(mapHeaders);
      console.log("headers", headers);
      console.log("id", headers["id"]);
      console.log("unix_time", headers["unix_time"]);
    } catch (e) {

    }
  }
}