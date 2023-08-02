import { GetRatesRequest, GetRatesResponse } from "./currency-provider";


export interface EcbProvider {
  GetRates(request: GetRatesRequest): Promise<GetRatesResponse>;
}

