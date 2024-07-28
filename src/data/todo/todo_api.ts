import { Todo } from "../../model/todo";

export abstract class TodoApi {
  abstract create(param: Todo): Promise<void>;
  abstract read(id: string): Promise<Todo | undefined>;
  abstract update(param: Todo): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract completed(param: Todo): Promise<void>;
  abstract list(param: Todo): Promise<Todo[]>;
}
