import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Injectable } from "@nestjs/common";


@Injectable()
export class TrpcClientService {

  getTRPC(url: string) {
    return createTRPCProxyClient({
      links: [
        httpBatchLink({
          url
        })
      ]
    });
  }

}