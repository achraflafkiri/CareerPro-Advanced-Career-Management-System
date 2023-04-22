import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiClose, mdiAccountRemove } from "@mdi/js";
import { useParams } from "react-router-dom";
import { getAllEmployees } from "../../api/functions/employees";
import {
  AddNewAttendance,
  RemoveAttendance,
} from "../../api/functions/Attendance";
import { useStateContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";

const EmployeesPresence = () => {
  const [dataList, setDataList] = useState(null);
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const [pre, setPre] = useState(false);
  const [abs, setAbs] = useState(false);

  const { societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllEmployees(societeId);
      setDataList(res.data.employees);
    }
    fetchData();
  }, [societeId]);

  const { token } = useStateContext();
  const handlePresent = async (e, employeeId) => {
    e.preventDefault();

    const data = {
      employeeId,
      date,
      isPresent: true,
    };

    try {
      const res = await AddNewAttendance(token, data, societeId);
      setPre((prevState) => ({ ...prevState, [employeeId]: !pre }));
      setAbs((prevState) => ({ ...prevState, [employeeId]: !abs }));
      if (res.status === 201) {
        console.log(res.data);
        toast.success(`${res.data.message}`, {
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
    }
  };

  const handleAbsence = async (e, employeeId) => {
    e.preventDefault();

    const data = {
      employeeId,
      date,
    };

    try {
      const res = await RemoveAttendance(token, data, societeId);
      setAbs((prevState) => ({ ...prevState, [employeeId]: !abs }));
      setPre((prevState) => ({ ...prevState, [employeeId]: !pre }));
      if (res.status === 200) {
        console.log(res.data);
        toast.success(`${res.data.message}`, {
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
    }
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-center">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="forms-sample">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled
                  />
                </div>
              </form>

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Present</th>
                      <th>Absence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList?.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.employee_fname} {item.employee_lname}
                        </td>
                        <td>
                          <button
                            className={`btn btn-icon me-3 d-none d-md-block ${
                              pre[item._id] ? "btn-success" : "btn-light"
                            }`}
                            onClick={(e) => handlePresent(e, item._id)}
                          >
                            <Icon path={mdiClose} size={1} />
                          </button>
                        </td>
                        <td>
                          <button
                            className={`btn btn-icon me-3 d-none d-md-block ${
                              abs[item._id] ? "btn-danger" : "btn-light"
                            } `}
                            onClick={(e) => handleAbsence(e, item._id)}
                          >
                            <Icon path={mdiAccountRemove} size={1} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPresence;
