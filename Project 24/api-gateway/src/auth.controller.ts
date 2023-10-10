import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { LoginDTO, RegisterDTO } from "./dto/model";


@Controller("auth")
export class AuthController {

  constructor(
    @Inject("USER_SERVICE") private client: ClientProxy
  ) {
  }

  @Post("login")
  async login(@Body() payload: LoginDTO) {
    return this.client.send({ cmd: "AUTH_LOGIN" }, payload);
  }

  @Post("register")
  async register(@Body() payload: RegisterDTO) {
    return this.client.send({ cmd: "AUTH_REGISTER" }, payload);
  }

  @Get("users")
  async getALLUsers() {
    return this.client.send({ cmd: "GET_ALL_USERS" }, {});
  }
}