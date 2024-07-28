import { TodoApi } from "./todo/todo_api";
import { TodoMock } from "./todo/todo_mock";

export const todoApi: TodoApi = new TodoMock(4);
