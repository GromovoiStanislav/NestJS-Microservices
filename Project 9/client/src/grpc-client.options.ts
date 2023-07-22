import { ClientOptions, Transport } from "@nestjs/microservices";
import { join } from "node:path";

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: "hero",
    protoPath: join(__dirname, "../proto/hero.proto")
  }
};