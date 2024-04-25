import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CheckoutController } from "./checkout/checkout.controller";
import { PaymentController } from "./payment/payment.controller";
import { ValidateSomethingController } from "./validate-something/validate-something.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "KAFKA_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_HOSTNAME],
            sasl: {
              mechanism: "scram-sha-256",
              username: process.env.KAFKA_USERNAME,
              password: process.env.KAFKA_PASSWORD
            },
            ssl: true
          }
        }
      }
    ])
  ],
  controllers: [
    CheckoutController,
    PaymentController,
    ValidateSomethingController
  ],
  providers: []
})
export class AppModule {
}