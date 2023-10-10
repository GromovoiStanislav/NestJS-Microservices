import { Controller, Get, Param } from "@nestjs/common";
import { CreateUserDTO } from "src/dto/create-user.dto";
import { UsersService } from "./users.service";
import { MessagePattern } from "@nestjs/microservices";


@Controller("users")
export class UsersController {

  constructor(
    private usersService: UsersService) {
  }

  @Get(":email")
  async getUser(@Param("email") email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Get()
  async getUsers() {
    return this.usersService.getAll();
  }


  @MessagePattern({ cmd: "AUTH_REGISTER" })
  async crateUser(payload: CreateUserDTO) {
    return this.usersService.createUser(payload);
  }


  @MessagePattern({ cmd: "AUTH_LOGIN" })
  async getUserByEmail(payload) {
    return this.usersService.getUserByEmail(payload.email);
  }

  @MessagePattern({ cmd: "GET_ALL_USERS" })
  async getALLUsers() {
    return this.usersService.getAll();
  }
}