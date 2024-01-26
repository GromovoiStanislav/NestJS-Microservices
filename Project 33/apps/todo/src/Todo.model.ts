import { Todo } from "@prisma/client";

export class ITodo implements Todo {
  id: number;
  description: string;
  isDone: boolean;
}
