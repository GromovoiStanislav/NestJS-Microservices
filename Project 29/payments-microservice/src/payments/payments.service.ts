import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "src/typeorm/entities/Payment";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { User } from "src/typeorm/entities/User";

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
    @Inject("NATS_SERVICE") private natsClient: ClientProxy
  ) {
  }

  async createPayment({ userId, ...createPaymentDto }: CreatePaymentDto) {

    const user = await lastValueFrom<User>(
      this.natsClient.send({ cmd: "getUserById" }, { userId })
    );

    if (user) {
      const newPayment = this.paymentsRepository.create({
        ...createPaymentDto,
        user
      });

      return this.paymentsRepository.save(newPayment);
    }

    return null;
  }

}