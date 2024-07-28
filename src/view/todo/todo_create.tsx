import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { GlobalContext } from "../..";

export function TodoCreate() {
  const { todoApi } = useContext(GlobalContext)!;

  return (
    <>
      <div className="flex flex-col gap-10">
        <Formik
          initialValues={{ name: "" }}
          validateOnChange={false}
          validateOnBlur={false}
          validate={(values) => {
            const errors: any = {};

            if (!values.name) {
              errors.name = "* Name cannot be empty";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            todoApi.create({ name: values.name });
            resetForm();
            setSubmitting(false);
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
                  ADD
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
