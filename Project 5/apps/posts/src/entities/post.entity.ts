import { ObjectType, Field, Int } from "@nestjs/graphql";
import { User } from './user.entity';

@ObjectType()
//@Directive('@key(fields: "id")')
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  body: string;

  @Field()
  authorId: number;

  @Field(() => User)
  user?: User;
}