import { Observable } from "rxjs";

export const ORDER_SERVICE_NAME = "OrderService";
export const ORDER_PACKAGE_NAME = "order";


export interface CreateOrderRequest {
  productId: number;
  quantity: number;
  userId: number;
}


export interface CreateOrderResponse {
  status: number;
  error: string[];
  id: number;
}


export interface FindOneData {
  id: number;
  product: string;
  quantity: number;
  userId: number;
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


export interface OrderServiceClient {
  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  getAll(request: {}): Observable<FindManyResponse>;
}
