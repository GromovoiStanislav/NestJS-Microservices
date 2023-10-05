/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface Empty {
}

export interface GetUsersResponse {
  users: User[];
}

export interface GetUserRequest {
  email: string;
}

export interface GetUserResponse {
  found: boolean;
  user?: User | undefined;
}

export interface User {
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  name: string;
  email: string;
}

export const USERS_PACKAGE_NAME = "users";

export interface UsersServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;

  getUsers(request: Empty): Observable<GetUsersResponse>;

  getUser(request: GetUserRequest): Observable<GetUserResponse>;
}

export interface UsersServiceController {
  createUser(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  getUsers(request: Empty): Promise<GetUsersResponse> | Observable<GetUsersResponse> | GetUsersResponse;

  getUser(request: GetUserRequest): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "getUsers", "getUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
