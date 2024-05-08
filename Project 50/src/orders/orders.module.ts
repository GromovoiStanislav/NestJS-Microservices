import { Module } from '@nestjs/common';
//import { OrdersService } from './orders.service';
//import { OrdersController } from './orders.controller';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
//import { KafkaProducerController } from './kafka-producer/kafka-producer.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
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
    ]),
  ],
  controllers: [
    // OrdersController,
    // KafkaProducerController
  ],
  providers: [
    //OrdersService,
    // {
    //   provide: 'KAFKA_PRODUCER',
    //   useFactory: async (kafkaClient: ClientKafka) => {
    //     return kafkaClient.connect();
    //   },
    //   inject: ['KAFKA_SERVICE'],
    // },
  ],
})
export class OrdersModule {}