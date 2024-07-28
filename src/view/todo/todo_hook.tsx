import { useState } from "react";
import { RequestResult, RequestState } from "../../config/type";
import { randomID } from "../../config/utility";
import { todoApi } from "../../data/data_loader";
import { Todo } from "../../model/todo";

export type TodoApiModel = {
  create(param: Todo): Promise<void>;
  read(id: string): Promise<void>;
  update(param: Todo): Promise<void>;
  remove(id: string): Promise<void>;
  completed(param: Todo): Promise<void>;
  list(param: Todo): Promise<void>;
  result: RequestResult<Todo>;
};

export function useTodoApi(): TodoApiModel {
  const [result, setResult] = useState<RequestResult<Todo>>({
    list: [],
    state: RequestState.idle,
  });

  async function create(param: Todo) {
    const a = { ...result };

    const b = {
      id: randomID(12),
      name: param.name,
      completed: false,
      created: new Date(),
      updated: new Date(),
    };

    a.list.push(b);

    setResult({
      ...a,
      state: RequestState.loading,
      error: undefined,
    });

    await todoApi
      .create(b)
      .then(() => {
        setResult({
          ...a,
          state: RequestState.complete,
          error: undefined,
        });
      })
      .catch((error: Error) => {
        setResult({
          ...a,
          state: RequestState.complete,
          error: error,
        });
      });
  }

  async function read(id: string): Promise<void> {
    const a = { ...result };

    setResult({
      ...a,
      state: RequestState.loading,
      error: undefined,
    });

    await todoApi
      .read(id)
      .then((todo) => {
        setResult({
          ...a,
          detail: todo,
          state: RequestState.complete,
          error: undefined,
        });
      })
      .catch((error: Error) => {
        setResult({ ...a, state: RequestState.complete, error: error });
      });
  }

  async function update(param: Todo): Promise<void> {
    const a = { ...result };
    const b = a.list.findIndex((c) => c.id == param.id);
    a.list[b] = param;

    if (b >= 0) {
      setResult({
        ...a,
        state: RequestState.loading,
        error: undefined,
      });
    }

    await todoApi
      .update(param)
      .then(() => {
        setResult({ ...a, state: RequestState.complete, error: undefined });
      })
      .catch((error: Error) => {
        setResult({ ...a, state: RequestState.complete, error: error });
      });
  }

  async function remove(id: string): Promise<void> {
    const a = { ...result };
    const b = a.list.findIndex((c) => c.id == id);

    if (b >= 0) {
      a.list.splice(b, 1);

      setResult({
        ...a,
        state: RequestState.loading,
        error: undefined,
      });
    }

    await todoApi
      .delete(id)
      .then(() => {
        setResult({ ...a, state: RequestState.complete, error: undefined });
      })
      .catch((error: Error) => {
        setResult({ ...a, state: RequestState.complete, error: error });
      });
  }

  async function completed(param: Todo): Promise<void> {
    const a = { ...result };
    const b = a.list.findIndex((c) => c.id == param.id);

    if (b >= 0) {
      a.list[b] = param;
      setResult({ ...a, state: RequestState.loading, error: undefined });

      await todoApi
        .completed(param)
        .then(() => {
          setResult({ ...a, state: RequestState.complete, error: undefined });
        })
        .catch((error: Error) => {
          setResult({ ...a, error: error, state: RequestState.complete });
        });
    }
  }

  async function list(param: Todo) {
    const a = { ...result };

    setResult({
      ...a,
      detail: undefined,
      state: RequestState.loading,
      error: undefined,
    });

    await todoApi
      .list(param)
      .then((todos) => {
        setResult({
          ...a,
          list: todos,
          detail: undefined,
          state: RequestState.complete,
          error: undefined,
        });
      })
      .catch((error: Error) => {
        setResult({
          ...a,
          detail: undefined,
          state: RequestState.complete,
          error: error,
        });
      });
  }

  return {
    create,
    read,
    update,
    remove,
    completed,
    list,
    result,
  };
}
