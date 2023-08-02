import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CurrencyConverterController } from './currency-converter.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CURRENCYCONVERTER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'currencyConverter',
          protoPath: join(__dirname, '../../proto/currency-converter.proto'),
          url: '0.0.0.0:50053',
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'ECBPROVIDER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'ecbProvider',
          protoPath: join(__dirname, '../../proto/ecb-provider.proto'),
          url: '0.0.0.0:50052',
        },
      },
    ]),
  ],
  controllers: [CurrencyConverterController]
})
export class CurrencyConverterModule {}
