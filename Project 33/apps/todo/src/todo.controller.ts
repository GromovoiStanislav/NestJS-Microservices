import { Controller } from '@nestjs/common';
import { PostTodoDTO, TodoServiceController, TodoServiceControllerMethods } from "proto/todo";
import { TodoService } from './todo.service';

@Controller()
@TodoServiceControllerMethods()
export class TodoController implements TodoServiceController {

  constructor(
    private readonly todoService: TodoService
  ) {}

  async postTodo(postTodoDTO: PostTodoDTO) {
    return await this.todoService.postTodo(postTodoDTO);
  }

  async getTodos() {
    return await this.todoService.getTodos();
  }
}
