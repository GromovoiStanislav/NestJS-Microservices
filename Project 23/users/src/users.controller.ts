import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { GrpcMethod } from "@nestjs/microservices";
import {
  CreateUserRequest,
  CreateUserResponse,
  Empty,
  GetUserRequest,
  GetUserResponse, GetUsersResponse,
  UsersServiceController,
  UsersServiceControllerMethods
} from "./proto/users";

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {

  constructor(
    private readonly usersService: UsersService
  ) {
  }

  //@GrpcMethod('UsersService', 'GetUsers')
  async getUsers(request: Empty): Promise<GetUsersResponse> {
    const users = await this.usersService.getAll();
    return { users };
  }

  //@GrpcMethod('UsersService', 'GetUser')
  async getUser(data: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.usersService.getOne(data.email);
    if (user) {
      return {
        found: true,
        user
      };
    } else {
      return {
        found: false,
      };
    }
  }

  //@GrpcMethod('UsersService', 'CreateUser')
  async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    return this.usersService.create(data);
  }


}
