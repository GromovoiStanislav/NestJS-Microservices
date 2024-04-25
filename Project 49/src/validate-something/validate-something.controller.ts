import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class ValidateSomethingController {

  @MessagePattern("validate-something")
  validateSomething(@Payload() message) {

    console.log(message);

    return {
      response: "response"
    };
  }

}