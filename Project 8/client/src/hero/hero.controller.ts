import { Controller, Get, Inject, OnModuleInit, Param } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom, Observable, ReplaySubject } from "rxjs";
import { toArray } from "rxjs/operators";
import { HeroById, HeroByIds } from "./interfaces/hero-by-id.interface";
import { Hero, Heroes } from "./interfaces/hero.interface";
import { HelloRequest, HelloResponse } from "./interfaces/hello.interface";
import { Metadata } from "@grpc/grpc-js";


interface HeroService {
  findOne(data: HeroById, metadata: Metadata): Observable<Hero>;

  getAll(data: {}): Observable<Heroes>;

  findMany(data: HeroByIds): Observable<Heroes>;

  findManyStream(upstream: Observable<HeroById>, metadata: Metadata): Observable<Hero>;

  getAllStream(data: {}): Observable<Hero>;

  bidiHello(upstream: Observable<HelloRequest>): Observable<HelloResponse>;

  lotsOfGreetings(upstream: Observable<HelloRequest>): Observable<HelloResponse>;
}


@Controller("hero")
export class HeroController implements OnModuleInit {

  private heroService: HeroService;

  constructor(
    @Inject("HERO_PACKAGE") private readonly client: ClientGrpc
  ) {
  }


  onModuleInit() {
    this.heroService = this.client.getService<HeroService>("HeroService");
  }


  @Get("all")
  async getAll(): Promise<Hero[]> {
    const { heroes } = await firstValueFrom(this.heroService.getAll({}));
    return heroes;
  }


  @Get("many")
  async getMany(): Promise<Hero[]> {
    const ids = [];
    ids.push(1);
    ids.push(2);
    ids.push(3);

    const { heroes } = await firstValueFrom(this.heroService.findMany({ ids }));
    return heroes;
  }


  @Get("stream/all")
  getAllStream(): Observable<Hero[]> {
    const stream = this.heroService.getAllStream({});
    return stream.pipe(toArray());
  }


  @Get("stream/many")
  FindManyStream(): Observable<Hero[]> {
    const ids$ = new ReplaySubject<HeroById>();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.next({ id: 5 });
    ids$.complete();


    const metadata = new Metadata();
    metadata.add("X-Meta", "1");
    metadata.add("X-Meta", "2");
    metadata.add("X-Meta", "3");

    // const stream = this.heroService.findManyStream(ids$.asObservable());
    // return stream.pipe(toArray());

    return this.heroService.findManyStream(ids$, metadata).pipe(toArray());
  }


  @Get("bidiHello")
  async bidiHello() {
    const helloRequest$ = new ReplaySubject<HelloRequest>();
    helloRequest$.next({ greeting: "Hello (1)!" });
    helloRequest$.next({ greeting: "Hello (2)!" });
    helloRequest$.complete();

    const stream = this.heroService.bidiHello(helloRequest$);

    // // Массив для хранения полученных ответов
    // const responses: any[] = [];
    //
    // // Подписываемся на поток и сохраняем каждый ответ в массив
    // stream.pipe(
    //   tap(response => responses.push(response))
    // ).subscribe();
    //
    // // Ожидаем завершения потока и возвращаем массив ответов
    // await lastValueFrom(stream);
    //
    // return responses;

    return stream.pipe(toArray());
  }


  @Get("lotsOfGreetings")
  lotsOfGreetings() {
    const helloRequest$ = new ReplaySubject<HelloRequest>();
    helloRequest$.next({ greeting: "Hello (1)!" });
    helloRequest$.next({ greeting: "Hello (2)!" });
    helloRequest$.complete();

    return this.heroService.lotsOfGreetings(helloRequest$);
  }


  @Get(":id")
  getById(@Param("id") id: string): Observable<Hero> {
    const metadata = new Metadata();
    metadata.add("X-Meta", "1");
    metadata.add("X-Meta", "2");
    metadata.add("X-Meta", "3");

    return this.heroService.findOne({ id: Number(id) }, metadata);
  }


}