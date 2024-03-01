import { Controller, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { HeroType } from "./constants";
import { Hero, HeroByIdOrType } from "./heroes.dto";
import { Http2gRPCExceptionFilter } from "src/shared.filters/http2gRPCException.filter";

const heros: Hero[] = [
  { id: 1, name: "John", type: HeroType.HUMAN },
  { id: 2, name: "Doe", type: HeroType.SPIRIT },
  { id: 3, name: "Jerry", type: HeroType.ANIMAL },
  { id: 4, name: "Tom", type: HeroType.HUMAN },
];

@Controller()
export class HeroesController {

  @GrpcMethod("HeroesService", "findOne")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new Http2gRPCExceptionFilter())
  findOne(data: HeroByIdOrType): Hero {
    const typeFiltered = heros.filter(({ type }) => !!data.type ? data.type === type : true);

    return (
      (data.id
        ? typeFiltered.find(({ id }) => data.id === id)
        : typeFiltered[0]) || new Hero()
    );
  }


  @GrpcMethod("HeroesService", "findMany")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new Http2gRPCExceptionFilter())
  findMany(data: HeroByIdOrType): {heroes:Hero[]} {
    const heroes = heros.filter(({ type }) => !!data.type ? data.type === type : true);
    return {heroes}
  }

}