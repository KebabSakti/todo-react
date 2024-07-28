import { createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFoundError } from "./view/error";
import { Root } from "./view/root";
import { TodoEdit } from "./view/todo/todo_edit";
import { TodoApiModel, useTodoApi } from "./view/todo/todo_hook";
import { TodoList } from "./view/todo/todo_list";

type Dependencies = {
  todoApi: TodoApiModel;
};

export const GlobalContext = createContext<Dependencies | undefined>(undefined);

export function Index() {
  const dependencies = {
    todoApi: useTodoApi(),
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFoundError />,
      children: [
        {
          index: true,
          element: <TodoList />,
        },
        {
          path: ":id/edit",
          element: <TodoEdit />,
        },
      ],
    },
  ]);

  return (
    <GlobalContext.Provider value={dependencies}>
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
}
