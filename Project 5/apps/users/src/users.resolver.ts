import { Args, Int, Mutation, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";

@Resolver(() => User)
export class UsersResolver {

  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @Mutation(() => User)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }


  @Query(() => [User], { name: "users" })
  async findAll() {
    return this.usersService.findAll();
  }


  @Query(() => User, { name: "user", nullable: true })
  async findOne(@Args("id",{ type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }


  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<User> {
    return this.usersService.findOne(reference.id);
  }

}
