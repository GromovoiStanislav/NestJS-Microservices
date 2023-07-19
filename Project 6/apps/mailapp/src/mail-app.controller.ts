import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { MailAppService } from "./mail-app.service";

@Controller()
export class MailAppController {

  constructor(
    private readonly mailAppService: MailAppService
  ) {
  }


  @EventPattern("new_mail")
  handleNewEmail(data: any) {
    console.log("MAIL - this is an incoming event...", data);
  }

}
