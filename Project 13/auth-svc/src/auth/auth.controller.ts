import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FindManyRequestDto,
  FindOneRequestDto,
  LoginRequestDto,
  RegisterRequestDto,
  ValidateRequestDto
} from "./dto/auth.dto";
import {
  AUTH_SERVICE_NAME,
  RegisterResponse,
  LoginResponse,
  ValidateResponse,
  FindManyResponse, FindOneResponse
} from "./proto/auth.pb";
import { AuthService } from './service/auth.service';

@Controller()
export class AuthController {

  @Inject(AuthService)
  private readonly service: AuthService;


  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  register(payload: RegisterRequestDto): Promise<RegisterResponse> {
    return this.service.register(payload);
  }


  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  login(payload: LoginRequestDto): Promise<LoginResponse> {
    return this.service.login(payload);
  }


  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }


  @GrpcMethod(AUTH_SERVICE_NAME, 'GetAll')
  getAll(): Promise<FindManyResponse> {
    return this.service.getAll();
  }


  @GrpcMethod(AUTH_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.service.findOne(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'FindMany')
  private findMany(payload: FindManyRequestDto): Promise<FindManyResponse> {
    return this.service.findMany(payload);
  }

}
