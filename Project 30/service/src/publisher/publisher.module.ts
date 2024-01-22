import { Module } from '@nestjs/common';
import { PublisherController } from './publisher.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        }
      },
    ]),
  ],
  controllers: [PublisherController]
})
export class PublisherModule {}
