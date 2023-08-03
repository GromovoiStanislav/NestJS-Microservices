import { Body, Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  AuthServiceClient,
  RegisterResponse,
  RegisterRequest,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  FindOneResponse,
  FindManyResponse
} from "./proto/auth.pb";



@Controller("auth")
export class AuthController implements OnModuleInit {

  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;


  onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }


  @Post("register")
  async register(@Body() body: RegisterRequest): Promise<Observable<RegisterResponse>> {
    return this.svc.register(body);
  }


  @Post("login")
  async login(@Body() body: LoginRequest): Promise<Observable<LoginResponse>> {
    return this.svc.login(body);
  }

  @Get("users")
  async getAll(): Promise<Observable<FindManyResponse>> {
    return this.svc.getAll({});
  }

  @Get("users/:id")
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Observable<FindOneResponse>> {
    return this.svc.findOne({ id });
  }

}
