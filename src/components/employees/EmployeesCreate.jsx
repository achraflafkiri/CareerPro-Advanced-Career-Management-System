import React from "react";
import { useFormik } from "formik";
import { createNewEmployee } from "../../api/functions/employees";
import { useStateContext } from "../../context/ContextProvider";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeesForm = () => {
  const navigate = useNavigate();
  const { societeId } = useParams();
  const { token } = useStateContext();

  const formik = useFormik({
    initialValues: {
      employee_fname: "",
      employee_lname: "",
      cni: "",
      phone: "",
      email: "",
      role: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await createNewEmployee(token, values, societeId);
        if (response.status === 201) {
          navigate(`/societe/${societeId}/employees`);
          toast.success(`${response.data.message}`, {
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
    validate: (values) => {
      const errors = {};
      if (!values.employee_fname) {
        errors.employee_fname = "First name is required";
      }
      if (!values.employee_lname) {
        errors.employee_lname = "Last name is required";
      }
      if (!values.cni) {
        errors.cni = "CIN is required";
      }
      if (!values.phone) {
        errors.phone = "Phone is required";
      }
      return errors;
    },
  });

  return (
    <div className="row">
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create new employee</h4>
            <form onSubmit={formik.handleSubmit} className="forms-sample">
              <div className="form-group">
                <label htmlFor="employee_fname">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="employee_fname"
                  id="employee_fname"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employee_fname}
                />
                {formik.touched.employee_fname &&
                formik.errors.employee_fname ? (
                  <div className="text-danger">
                    {formik.errors.employee_fname}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="employee_lname">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="employee_lname"
                  id="employee_lname"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employee_lname}
                />
                {formik.touched.employee_lname &&
                formik.errors.employee_lname ? (
                  <div className="text-danger">
                    {formik.errors.employee_lname}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="cni">
                  CNI <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cni"
                  id="cni"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cni}
                />
                {formik.touched.cni && formik.errors.cni ? (
                  <div className="text-danger">{formik.errors.cni}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-danger">{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mr-2"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Loading..." : "Submit"}
              </button>
              <Link
                to={`/societe/${societeId}/employees`}
                className="btn btn-light"
              >
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesForm;
