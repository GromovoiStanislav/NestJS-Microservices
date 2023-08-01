import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UsersServiceController,
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  PaginationDto,
} from '@app/common';
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";

@Controller()
export class UsersController implements UsersServiceController {

  constructor(
    private readonly usersService: UsersService
  ) {}


  @GrpcMethod('UsersService', 'CreateUser')
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UsersService', 'FindAllUsers')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @GrpcMethod('UsersService', 'FindOneUser')
  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  @GrpcMethod('UsersService', 'UpdateUser')
  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod('UsersService', 'RemoveUser')
  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  @GrpcStreamMethod('UsersService', 'QueryUsers')
  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
  }

}
