export const ORDER_SERVICE_NAME = 'OrderService';
export const ORDER_PACKAGE_NAME = 'order';


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


