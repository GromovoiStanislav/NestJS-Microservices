import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {

  private readonly users: User[] = [];


  async create(createUserInput: CreateUserInput) {
    const newUser = { ...createUserInput, id: this.users.length + 1 }
    this.users.push(newUser);
    return newUser;
  }


  async findAll() {
    return this.users;
  }


  async findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

}