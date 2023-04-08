import React, { useState } from "react";
import { createNewEmployee } from "../../api/functions/employees";
import { useStateContext } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";

const EmployeesForm = () => {
  const [formData, setFormData] = useState({
    employee_fname: "",
    employee_lname: "",
    cni: "",
    phone: "",
    email: "",
    role: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { societeId } = useParams();
  const { token } = useStateContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNewEmployee(token, formData, societeId);
      if (response.status === 201) {
        setSuccess(true); // set success to true on successful creation of company
        console.log("create employee successfully!");
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            {success && (
              <div className="mt-3 alert alert-success">
                Employee créée avec succès !
              </div>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="employee_fname">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="employee_fname"
                  id="employee_fname"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="employee_lname">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="employee_lname"
                  id="employee_lname"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cni">
                  CNI <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cni"
                  id="cni"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-secondary text-white"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary text-white">
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesForm;
