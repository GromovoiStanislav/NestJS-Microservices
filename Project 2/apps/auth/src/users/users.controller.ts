import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserRequest } from "./dto/create-user.request";
import { UsersService } from "./users.service";
import { MessagePattern, Payload } from "@nestjs/microservices";


@Controller("auth/users")
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }


  // test RPC:

  @MessagePattern({ cmd: "users_test" })
  async auth_test(@Payload() data: any) {
    if (data.userId) {
      return this.usersService.getUser({ _id: data.userId });
    }
    return this.usersService.getAllUsers();
  }

}
