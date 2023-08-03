export const PRODUCT_PACKAGE_NAME = 'product';
export const PRODUCT_SERVICE_NAME = 'ProductService';


export interface CreateProductRequest {
  name: string;
  sku: string;
  stock: number;
  price: number;
}


export interface CreateProductResponse {
  status: number;
  error: string[];
  id: number;
}


export interface FindOneData {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
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


export interface DecreaseStockRequest {
  id: number;
  orderId: number;
  quantity: number;
}


export interface DecreaseStockResponse {
  status: number;
  error: string[];
}

