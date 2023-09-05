import { Module } from "@nestjs/common";
import { TrpcRouter } from "./trpc.router";
import { TrpcServerService } from "@app/common";

@Module({
  providers: [TrpcServerService, TrpcRouter],
  exports: [TrpcRouter]
})
export class TrpcModule {
}
