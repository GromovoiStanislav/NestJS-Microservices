import { Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import JwtAuthGuard from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { User } from "./users/schemas/user.schema";


@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {
  }


  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }


  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.logout(response);
    return 'logout';
  }


  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getMe(@CurrentUser() user: User) {
    return user;
  }


  @UseGuards(JwtAuthGuard)
  @MessagePattern("validate_user")
  async validateUser(@CurrentUser() user: User) {
    return user;
  }


  // test RPC:

  @MessagePattern("auth_test")
  async auth_test(@Payload() data: any) {
    return this.authService.auth_test(data);
  }

}
