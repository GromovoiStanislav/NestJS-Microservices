import { Body, Controller, Get, Inject, NotFoundException, OnModuleInit, Param, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateUserRequest, GetUserResponse, GetUsersResponse } from "./proto/users";

@Controller()
export class AppController implements OnModuleInit {
  private usersService;


  constructor(
    private readonly appService: AppService,
    @Inject("USERS_SERVICE") private client: ClientGrpc
  ) {
  }

  onModuleInit() {
    this.usersService = this.client.getService("UsersService");
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("users")
  async getUsers() {
    const data: GetUsersResponse = await firstValueFrom(this.usersService.GetUsers({}));
    return data.users;
  }

  @Get("users/:email")
  async getUser(@Param("email") email: string) {
    const data: GetUserResponse = await firstValueFrom(this.usersService.GetUser({ email }));
    if (data.found) {
      return data.user;
    } else {
      throw new NotFoundException(`User with ${email} not found`);
    }
  }

  @Post("users")
  async createUsers(@Body() data: CreateUserRequest) {
    return this.usersService.CreateUser(data)
  }

}
