import React, { useState } from "react";
import { createNewEmployee } from "../../api/functions/employees";
import { useStateContext } from "../../context/ContextProvider";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeesForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_fname: "",
    employee_lname: "",
    cni: "",
    phone: "",
    email: "",
    role: "",
  });

  const [success, setSuccess] = useState(false);
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
      toast.error(`${err.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create new employee</h4>
            <form onSubmit={handleSubmit} className="forms-sample">
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <Link
                  to={`/societe/${societeId}/employees`}
                  className="btn btn-light text-dark"
                >
                  Close
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary text-white mx-2"
                >
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
