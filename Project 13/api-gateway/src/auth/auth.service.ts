import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  FindManyResponse,
  FindOneResponse,
  ValidateResponse
} from "./proto/auth.pb";


@Injectable()
export class AuthService implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.svc.validate({ token }));
  }

  async findOne(id: number): Promise<FindOneResponse> {
    return await firstValueFrom(this.svc.findOne({ id }))
  }

  async findMany(ids: number[]): Promise<FindManyResponse> {
    return await firstValueFrom(this.svc.findMany({ ids }));
  }

}
