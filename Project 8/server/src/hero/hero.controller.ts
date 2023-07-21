import { Controller } from "@nestjs/common";
import { GrpcMethod, GrpcStreamCall, GrpcStreamMethod } from "@nestjs/microservices";
import { from, Observable, Subject } from "rxjs";

import { HeroById, HeroByIds } from "./interfaces/hero-by-id.interface";
import { Hero } from "./interfaces/hero.interface";
import { HelloResponse } from "./interfaces/hello.interface";
import { Metadata } from "@grpc/grpc-js";


@Controller("hero")
export class HeroController {

  private readonly items: Hero[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
    { id: 3, name: "Loe" },
    { id: 4, name: "Tom" },
    { id: 5, name: "Toma" },
    { id: 6, name: "Tomas" }
  ];


  @GrpcMethod("HeroService")
  async findOne(data: HeroById, metadata: Metadata): Promise<Hero> {

    const meta = metadata.get("X-Meta");
    console.log("X-Meta", meta);

    return this.items.find(({ id }) => id === data.id);
  }


  @GrpcMethod("HeroService")
  async getAll() {
    return { heroes: this.items };
  }


  @GrpcMethod("HeroService")
  async findMany(data: HeroByIds) {
    const result = [];

    data.ids.forEach(id => {
      const hero = this.items.find(hero => id === hero.id);
      if (hero) {
        result.push(hero);
      }
    });

    return { heroes: result };
  }


  @GrpcStreamMethod("HeroService")
  findManyStream(data$: Observable<HeroById>, metadata: Metadata): Observable<Hero> {


    const meta = metadata.get("X-Meta");
    console.log("X-Meta", meta);


    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();

    data$.subscribe({
      next: onNext,
      complete: onComplete
    });

    return hero$.asObservable();
  }


  @GrpcMethod("HeroService")
  getAllStream(): Observable<Hero> {
    return from(this.items);
  }


  @GrpcStreamCall("HeroService")
  bidiHello(requestStream: any) {
    requestStream.on("data", message => {
      console.log(message);
      requestStream.write({
        reply: message.greeting
      });
    });

    requestStream.on("end", () => {
      // Завершение потока после того, как все данные обработаны.
      requestStream.end();
    });
  }


  @GrpcStreamCall("HeroService")
  lotsOfGreetings(requestStream: any, callback: (err: unknown, value: HelloResponse) => void) {
    requestStream.on("data", message => {
      console.log(message);
    });

    requestStream.on("end", () => callback(null, { reply: "Hello, world!" }));
  }

}