export const AUTH_SERVICE_NAME = 'AuthService';
export const AUTH_PACKAGE_NAME = 'auth';


export interface RegisterRequest {
  email: string;
  password: string;
}


export interface RegisterResponse {
  status: number;
  error: string[];
}


export interface LoginRequest {
  email: string;
  password: string;
}


export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}


export interface ValidateRequest {
  token: string;
}


export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export interface FindOneData {
  id: number;
  email: string;
}


export interface FindOneRequest {
  id: number;
}


export interface FindOneResponse {
  status: number;
  error: string[];
  data: FindOneData | undefined;
}


export interface FindManyResponse {
  status: number;
  error: string[];
  data: FindOneData[];
}