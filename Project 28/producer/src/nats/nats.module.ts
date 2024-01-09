import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    {
      provide: 'CATS_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: ['nats://localhost:4222'],
            headers: { 'x-version': '1.0.0' },
          },
        }),
    },
  ],
  exports:['CATS_SERVICE']
})
export class NatsModule {}