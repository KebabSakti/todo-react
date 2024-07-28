import { faker } from "@faker-js/faker";
import { delay, randomID } from "../../config/utility";
import { Todo } from "../../model/todo";
import { TodoApi } from "../todo/todo_api";
import { BadRequest } from "../../config/error";

export class TodoMock implements TodoApi {
  todos: Todo[] = [];

  constructor(fakeDataLength: number = 0) {
    [...Array(fakeDataLength)].forEach(() => {
      this.todos.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        completed: false,
        created: new Date(),
        updated: new Date(),
      });
    });
  }

  async create(param: Todo): Promise<void> {
    await delay(1000);
    const id = param.id != undefined ? param.id : randomID(12);

    this.todos.push({
      id: id,
      name: param.name,
      completed: false,
      created: new Date(),
      updated: new Date(),
    });
  }

  async read(id: string): Promise<Todo | undefined> {
    await delay(1000);
    const todo: Todo | undefined = this.todos.find((item) => item.id == id);

    if (todo != undefined) {
      return todo;
    }

    throw new BadRequest("User not found");
  }

  async update(param: Todo): Promise<void> {
    await delay(1000);
    const index = this.todos.findIndex((todo) => todo.id == param.id);

    this.todos[index] = {
      ...this.todos[index],
      name: param.name,
      completed: param.completed,
      updated: new Date(),
    };
  }

  async delete(id: string): Promise<void> {
    await delay(1000);
    const index = this.todos.findIndex((todo) => todo.id == id);

    this.todos[index] = {
      ...this.todos[index],
      deleted: new Date(),
    };
  }

  async completed(param: Todo): Promise<void> {
    await delay(1000);
    const index = this.todos.findIndex((todo) => todo.id == param.id);

    this.todos[index] = {
      ...this.todos[index],
      id: param.id,
      completed: param.completed,
      updated: new Date(),
    };
  }

  async list(param: Todo): Promise<Todo[]> {
    await delay(1000);

    const filteredTodos = this.todos.filter(
      (todo) => todo.deleted == undefined
    );

    const todos = param.name != undefined ? [filteredTodos[0]] : filteredTodos;

    return todos;
  }
}
