import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Get, Inject, OnModuleInit } from "@nestjs/common";
import { GrpcMethod } from '@nestjs/microservices';
import { Hero, HeroById, HeroesService } from './proto/hero';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Controller("hero")
export class HeroController implements OnModuleInit {

  private heroClientService: HeroesService;

  private items = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];


  constructor(
    @Inject('HERO_PACKAGE') private readonly client: ClientGrpc,
  ) {}


  onModuleInit() {
    this.heroClientService = this.client.getService<HeroesService>('HeroesService');
  }


  @GrpcMethod('HeroesService')
  findOne(data: HeroById, metadata: Metadata, call: ServerUnaryCall<any, any>): Hero {
    return this.items.find(({ id }) => id === data.id);
  }


  @Get("/grpc")
  callGRPCclient(): Hero {
    const $hero = this.heroClientService.FindOne({ id: 1 });
    const firstNumber = firstValueFrom($hero as unknown as Observable<Hero>);
    return firstNumber as unknown as Hero
  }


  @Get()
  getHello() {
    return 'hello from Hero'
  }
}