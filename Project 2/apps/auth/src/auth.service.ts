import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { User } from "./users/schemas/user.schema";
import { UsersService } from "./users/users.service";

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {
  }


  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString()
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get("JWT_EXPIRATION")
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie("Authentication", token, {
      httpOnly: true,
      expires
    });
  }


  logout(response: Response) {
    response.cookie("Authentication", "", {
      httpOnly: true,
      expires: new Date()
    });
  }


  // test RPC:

  async auth_test(data: any) {
    if (data.userId) {
      return this.usersService.getUser({ _id: data.userId });
    }
    return this.usersService.getAllUsers();
  }
}
