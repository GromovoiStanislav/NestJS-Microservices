import { Observable } from 'rxjs';
import { Metadata } from "@grpc/grpc-js";

export interface IGrpcService {
  accumulate(numberArray: INumberArray): Observable<any>;
  addEvent(numberArray: INumberArray, metadata: Metadata): Observable<any>;
}

interface INumberArray {
  data: number[];
}
