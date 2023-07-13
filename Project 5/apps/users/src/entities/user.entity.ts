import { ObjectType, Field, Directive, Int } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => Int )
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;
}