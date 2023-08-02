export interface ConvertRequest {
  sellCurrency: string;
  buyCurrency: string;
  sellAmount: number;
}

export interface ConvertResponse {
  sellAmount: number;
  sellCurrency: string;
  buyAmount: number;
  buyCurrency: string;
  conversionRate: number;
}

export interface CurrencyConverter {
  Convert(request: ConvertRequest): Promise<ConvertResponse>;
}
