import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllEmployees } from "../../api/functions/employees";
import { getAllAttendance } from "../../api/functions/Attendance";
import {
  AddNewAttendance,
  RemoveAttendance,
} from "../../api/functions/Attendance";
import { useStateContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";

const EmployeesPresence = () => {
  const [dataList, setDataList] = useState(null);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [attendances, setAttendances] = useState(null);

  const { societeId } = useParams();

  const { token } = useStateContext();

  async function fetchData() {
    const employeesRes = await getAllEmployees(societeId);
    const attendanceRes = await getAllAttendance(societeId, date);
    setDataList(employeesRes.data.employees);
    setAttendances(attendanceRes.data.attendances);
  }

  const handleAttendanceChange = async (employeeId, isPresent) => {
    const data = {
      employeeId,
      date,
      isPresent,
    };

    try {
      let res;
      if (isPresent) {
        res = await AddNewAttendance(token, data, societeId);
      } else {
        res = await RemoveAttendance(token, data, societeId);
      }
      if (res.status === 201 || res.status === 200) {
        fetchData();
        console.warn(res.data.message);
        // toast.success(`${res.data.message}`, {
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: false,
        //   progress: undefined,
        //   theme: "colored",
        // });
      }
    } catch (err) {
      fetchData();
      console.error(err.response.data.message);
      // toast.error(`${err.response.data.message}`, {
      //   position: "bottom-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: false,
      //   progress: undefined,
      //   theme: "colored",
      // });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const employeesRes = await getAllEmployees(societeId);
      const attendanceRes = await getAllAttendance(societeId, date);
      setDataList(employeesRes.data.employees);
      setAttendances(attendanceRes.data.attendances);
    }
    fetchData();
  }, [societeId, date]);

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
                    {dataList?.map((item) => {
                      const attendance = attendances?.find(
                        (att) => att.employeeId === item._id
                      );
                      const isPresent = attendance?.isPresent || false;
                      return (
                        <tr key={item._id}>
                          <td>
                            {item.employee_fname} {item.employee_lname}
                          </td>
                          <td>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={isPresent}
                                  onChange={() =>
                                    handleAttendanceChange(item._id, true)
                                  }
                                />
                                <i className="input-helper"></i>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={!isPresent}
                                  onChange={() =>
                                    handleAttendanceChange(item._id, false)
                                  }
                                />
                                <i className="input-helper"></i>
                              </label>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
