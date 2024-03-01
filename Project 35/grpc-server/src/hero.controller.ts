import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { HeroService, Hero, FindOneHeroConditions } from "@proto.ts/hero";

enum HeroType {
  HUMAN = "human",
  ANIMAL = "animal",
  SPIRIT = "spirit",
}

const heros: Hero[] = [
  { id: 1, name: "John", type: HeroType.HUMAN },
  { id: 2, name: "Doe", type: HeroType.SPIRIT }
];


@Controller()
export class HeroController implements HeroService {

  @GrpcMethod("HeroService", "findOne")
  async findOne(data: FindOneHeroConditions): Promise<Hero> {
    const typeFiltered = heros.filter(({ type }) =>
      !!data.type ? data.type === type : true
    );
    return (
      (data.id
        ? typeFiltered.find(({ id }) => data.id === id)
        : typeFiltered[0]) || { id: 0, name: "", type: "" }
    );
  }

}