import React, { useState } from "react";
import { Signup } from "../../api/functions/auth";
import { Link } from "react-router-dom/dist";
import { useStateContext } from "../../context/ContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
  const { setUserID, setToken } = useStateContext();
  const [isError, setIsError] = useState("");

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log("****", values);

      const response = await Signup(values);
      setUserID(response.data.user.id);
      setToken(response.data.token);
    } catch (err) {
      setIsError(err.response.data.message);
      console.log(err.response.data.message);
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
    }
    setSubmitting(false);
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="form-control special_styling"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="form-control special_styling"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control special_styling"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-inverse-primary btn-fw"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Register"}
              </button>
            </div>
            <div className="form-group">
              Already have an account?{" "}
              <Link className="btn-link text-primary" to={"/login"}>
                login
              </Link>
            </div>
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

export default RegisterForm;
