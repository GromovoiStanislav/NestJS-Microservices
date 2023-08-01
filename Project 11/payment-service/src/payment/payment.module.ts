import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PaymentController } from "./payment.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "TICKET_SERVICE",
        transport: Transport.TCP,
        options: {
          port: 5001
        }
      }
    ])
  ],
  controllers: [PaymentController]
})
export class PaymentModule {
}
