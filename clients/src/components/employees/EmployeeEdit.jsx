import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import EditModal from "./EmployeeEdit";
import { updateEmployee, getOneEmployee } from "../../api/functions/employees";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/ContextProvider";

const EmployeeEdit = () => {
  const navigate = useNavigate();
  const { societeId, employeeId } = useParams();
  const [newEditVal, setNewEditVal] = useState({
    employee_fname: "",
    employee_lname: "",
    cni: "",
    phone: "",
    email: "",
    salary: "",
  });

  const { employee_fname, employee_lname, cni, phone, email, salary } =
    newEditVal;

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEditVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await getOneEmployee(societeId, employeeId);

        if (response.data) {
          setNewEditVal({
            employee_fname: response.data.employee.employee_fname,
            employee_lname: response.data.employee.employee_lname,
            cni: response.data.employee.cni,
            phone: response.data.employee.phone,
            email: response.data.employee.email,
            salary: response.data.employee.salary,
          });
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
    };

    handleGetData();
  }, [societeId, employeeId]);

  const { token } = useStateContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await updateEmployee(
        token,
        newEditVal,
        societeId,
        employeeId
      );

      if (response.status === 200) {
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
        navigate(`/societe/${societeId}/employees`);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit employee</h4>
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
                  value={employee_fname}
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
                  value={employee_lname}
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
                  value={cni}
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
                  value={email}
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
                  value={phone}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="salary">salary</label>
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  value={salary}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Link
                  to={`/societe/${societeId}/employees`}
                  className="btn btn-light text-dark"
                >
                  Close
                </Link>
                <button
                  type="submit"
                  className="btn btn-success text-white mx-2"
                >
                  Update employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
