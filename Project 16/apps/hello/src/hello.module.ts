import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { TrpcModule } from "./trpc/trpc.module";


@Module({
  imports: [TrpcModule],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
