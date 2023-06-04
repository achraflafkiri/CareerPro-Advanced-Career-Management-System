import React from "react";
import { useFormik } from "formik";
import { useStateContext } from "../../context/ContextProvider";
import { createNewProduct } from "../../api/functions/products";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validate = (values) => {
  const errors = {};

  if (!values.product_name) {
    errors.product_name = "Name is required";
  }

  if (!values.date) {
    errors.date = "date is required";
  }

  if (isNaN(Number(values.quantity))) {
    errors.quantity = "Must be a number";
  }

  return errors;
};

const ProductCreate = ({ fetchData }) => {
  const navigate = useNavigate();
  const { token } = useStateContext();
  const { societeId } = useParams();

  const formik = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      quantity: "",
      date: new Date().toISOString().substr(0, 10),
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await createNewProduct(token, values, societeId);
        if (response.status === 201) {
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
          navigate(`/societe/${societeId}/products`);
          fetchData();
        } else {
          throw new Error("failed");
        }
      } catch (err) {
        toast.warn(`${err.response.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }
      setSubmitting(false);
    },
  });

  return (
    <div
      className="modal fade"
      id="addProduct"
      tabindex="-1"
      aria-labelledby="addProductLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add new product
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="product_name">
                  Name of product <span className="text-danger">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  className="form-control"
                  value={formik.values.product_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.product_name && formik.errors.product_name ? (
                  <div className="text-danger">
                    {formik.errors.product_name}
                  </div>
                ) : null}
              </div>
              <div className="mb-3">
                <label for="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="quantity">quantity</label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  className="form-control"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.quantity && formik.errors.quantity ? (
                  <div className="text-danger">{formik.errors.quantity}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="date">
                  Date <span className="text-danger">*</span>{" "}
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-danger">{formik.errors.date}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
