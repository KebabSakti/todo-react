import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../..";
import { RequestState } from "../../config/type";

export function TodoEdit() {
  const { todoApi } = useContext(GlobalContext)!;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id != undefined) {
      todoApi.read(id);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold border-b-8 border-gray-500 pb-2">
          EDIT TO-DO
        </div>
        {(() => {
          if (
            todoApi.result.state == RequestState.complete &&
            todoApi.result.detail == undefined
          ) {
            return (
              <div className="flex justify-center items-center bg-gray-200 p-4 rounded text-gray-500">
                No data available
              </div>
            );
          }

          if (todoApi.result.detail != undefined) {
            return (
              <Formik
                enableReinitialize
                initialValues={{
                  name: todoApi.result.detail.name,
                }}
                validateOnChange={false}
                validateOnBlur={false}
                validate={(values) => {
                  const errors: any = {};

                  if (!values.name) {
                    errors.name = "* Name cannot be empty";
                  }

                  return errors;
                }}
                onSubmit={(values) => {
                  todoApi.update({
                    ...todoApi.result.detail,
                    name: values.name,
                  });

                  navigate("/", { replace: true });
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="flex gap-2 h-10">
                      <div className="w-full">
                        <Field
                          type="text"
                          name="name"
                          className="w-full px-2 h-10"
                          placeholder="To-Do name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 px-2"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-2 font-semibold disabled:bg-gray-500"
                        disabled={isSubmitting}
                      >
                        SUBMIT
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            );
          }

          return (
            <div className="flex justify-center items-center bg-gray-200 p-4 rounded text-gray-500">
              Loading..
            </div>
          );
        })()}
      </div>
    </>
  );
}
