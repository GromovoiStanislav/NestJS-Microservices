import { IsEmail, IsString, MinLength } from "class-validator";
import { LoginRequest, RegisterRequest, ValidateRequest } from "../auth.pb";

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterRequestDto implements RegisterRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  token: string;
}
