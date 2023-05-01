import React, { useState } from "react";
import { createNewCompany } from "../../api/functions/companies";
import { useStateContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SocieteCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = useStateContext();

  const initialValues = {
    company_name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Email invalide").required("Email est requis"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNewCompany(token, values);
      if (response.status === 201) {
        navigate("/societe");
        toast.info(`${response.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      } else {
        throw new Error("failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-16">
        <div className="card">
          <div className="card-body">
            <p className="card-title">Create new company</p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="forms-sample">
                  <div className="form-group">
                    <label htmlFor="nom">
                      Nom de société <em className="text-danger">*</em>
                    </label>
                    <Field
                      type="text"
                      name="company_name"
                      id="company_name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="company_name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field
                      type="text"
                      name="description"
                      id="description"
                      className="form-control"
                      component="textarea"
                      rows="4"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="adresse">
                      Address <em className="text-danger"></em>
                    </label>
                    <Field
                      type="text"
                      name="address"
                      id="address"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telephone">
                      Téléphone <em className="text-danger"></em>
                    </label>
                    <Field
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      Email <em className="text-danger">*</em>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary mr-2 text-white"
                      disabled={isSubmitting || loading}
                    >
                      {isSubmitting || loading ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                      ) : (
                        <span className="text-white">Create company</span>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => navigate("/societe")}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocieteCreate;
