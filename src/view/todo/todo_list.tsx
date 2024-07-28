import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../..";
import { RequestState } from "../../config/type";
import { Todo } from "../../model/todo";
import { TodoCreate } from "./todo_create";

export function TodoList() {
  const { todoApi } = useContext(GlobalContext)!;

  useEffect(() => {
    todoApi.list({});
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8">
        <TodoCreate />
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold border-b-8 border-gray-500 pb-2">
            TO-DO LIST
          </div>
          {(() => {
            if (
              todoApi.result.state == RequestState.complete &&
              todoApi.result.list.length == 0
            ) {
              return (
                <div className="flex justify-center items-center bg-gray-200 p-4 rounded text-gray-500">
                  No data available
                </div>
              );
            }

            if (todoApi.result.list.length > 0) {
              const todos: Todo[] = todoApi.result.list;

              return (
                <div className="flex flex-col divide-y-2 divide-gray-500">
                  {todos.map((todo) => {
                    return (
                      <div
                        key={todo.id}
                        className="flex justify-between py-2 gap-2"
                      >
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            name="completed"
                            defaultChecked={todo.completed}
                            onChange={(e) => {
                              todoApi.completed({
                                ...todo,
                                completed: e.target.checked,
                              });
                            }}
                          />
                          <div
                            className={`line-clamp-1 break-all ${
                              todo.completed ? "line-through" : ""
                            }`}
                          >
                            {todo.name}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            state={todo}
                            to={`${todo.id}/edit`}
                            className="bg-amber-500 px-2 text-white hover:bg-amber-600"
                          >
                            Edit
                          </Link>
                          <button
                            className="bg-red-500 px-2 text-white cursor-pointer hover:bg-red-600"
                            onClick={() => {
                              if (window.confirm("Are you sure?")) {
                                todoApi.remove(todo.id!);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }

            return (
              <div className="flex justify-center items-center bg-gray-200 p-4 rounded text-gray-500">
                Loading..
              </div>
            );
          })()}
          {(() => {
            if (todoApi.result.error != undefined) {
              return (
                <div className="flex justify-center items-center bg-red-100 p-4 rounded text-gray-500">
                  {todoApi.result.error?.message}
                </div>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
}
