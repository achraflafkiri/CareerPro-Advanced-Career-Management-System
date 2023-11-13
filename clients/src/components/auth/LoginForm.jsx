import React, { useState } from "react";
import { Link } from "react-router-dom/dist";
import { Login } from "../../api/functions/auth";
import { useStateContext } from "../../context/ContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const { setUserID, setToken } = useStateContext();
  const [isError, setIsError] = useState("");

  const initialValues = {
    username: "lafkiri",
    password: "test1234",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await Login(values);
      setUserID(response.data.user.id);
      setToken(response.data.token);
    } catch (err) {
      setIsError(err.response.data.message);
      console.log(err.response.data.message);
      if (err.response) {
        setErrors({ login: err.response.data.message });
        setTimeout(() => {
          setErrors({ login: null });
          setIsError("");
        }, 3000);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="forms-sample">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                name="username"
                id="username"
                className="form-control special_styling"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="form-control special_styling"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-inverse-primary btn-fw"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Send"}
              </button>
            </div>
            <div className="form-group">
              I don't have an account{" "}
              <Link className="btn-link bg-light" to={"/register"}>
                create new account
              </Link>
            </div>
            <ErrorMessage
              name="login"
              component="div"
              className="alert alert-danger"
            />
          </Form>
        )}
      </Formik>
      {isError ? (
        <div class="alert alert-danger" role="alert">
          {isError}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default LoginForm;
