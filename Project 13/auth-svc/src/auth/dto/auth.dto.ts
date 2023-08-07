import { IsArray, IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { FindManyRequest, FindOneRequest, LoginRequest, RegisterRequest, ValidateRequest } from "../proto/auth.pb";

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

export class FindOneRequestDto implements FindOneRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  id: number;
}

export class FindManyRequestDto implements FindManyRequest {
  @IsArray()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  ids: number[];
}
