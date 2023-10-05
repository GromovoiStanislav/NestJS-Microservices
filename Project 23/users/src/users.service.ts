import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  private readonly users = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
  ];

  async create(newUser) {
    this.users.push(newUser);
    return newUser
  }

  async getOne(email) {
    return this.users.find(user => user.email === email)
  }

  async getAll() {
    return this.users;
  }
}
