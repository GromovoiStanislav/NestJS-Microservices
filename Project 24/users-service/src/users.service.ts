import { Injectable } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Injectable()
export class UsersService {

  private readonly USERS = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" }
  ];

  async createUser(user) {
    this.USERS.push(user);
    return this.USERS[this.USERS.length - 1];
  }

  async getUserByEmail(email) {
    const res = this.USERS.find(user => user.email === email);
    if (!res) {
      return {
        status: 404,
        message: "User not found"
      };
    }
    return res;
  }

  async getAll() {
    return this.USERS;
  }
}