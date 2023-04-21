import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiDownload } from "@mdi/js";
import {
  getAllEmployeesByDate,
  getAllEmployees,
  markAbsences,
} from "../../api/functions/employees";
import { useParams } from "react-router-dom";
import { mdiAlphaXCircle } from "@mdi/js";
import { useStateContext } from "../../context/ContextProvider";

const EmployeesPresence = () => {
  // Get today's date
  const today = new Date();
  const todayString = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;

  // Get yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = `${
    yesterday.getMonth() + 1
  }/${yesterday.getDate()}/${yesterday.getFullYear()}`;

  const [dataList, setDataList] = useState(null);
  const [absenceData, setAbsenceData] = useState({});

  // Set initial state for selected date and checkbox
  const [selectedDate, setSelectedDate] = useState(todayString);

  // Handle date and checkbox changes
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const { societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllEmployees(societeId);
      setDataList(res.data.employees);
      console.log("****", res.data.employees);
      const dataObj = {};
      res.data.employees.forEach((employee) => {
        dataObj[employee._id] = employee.absences.is_absent;
      });
      setAbsenceData(dataObj);
      console.log("____", absenceData);
    }
    fetchData();
  }, [societeId]);

  const { token } = useStateContext();
  const handleAttendace = async (e, employeeId) => {
    // console.log("absenceData => ", absenceData);

    e.preventDefault();
    // console.log(employeeId, selectedDate);
    const dataObj = {
      date: selectedDate,
    };

    // console.log(dataObj);

    try {
      const response = await markAbsences(
        token,
        dataObj,
        societeId,
        employeeId
      );
      console.log(token, dataObj, societeId, employeeId);
      console.log("is_absence -> ", response.data.absence.is_absent);
      if (response.data) {
        // console.log("msg ", response.data.message);
        setAbsenceData((prevState) => ({
          ...prevState,
          [employeeId]: response.data.absence.is_absent ? true : false,
        }));
      }
    } catch (error) {
      console.error(error);
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
                  <label htmlFor="date"></label>
                  <select
                    className="form-control"
                    id="date"
                    name="date"
                    value={selectedDate}
                    onChange={(event) => handleChange(event)}
                  >
                    <option value={todayString}>{todayString}</option>
                    <option value={yesterdayString}>{yesterdayString}</option>
                  </select>
                </div>
              </form>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="text-center align-middle">Employee</th>
                      <th className="text-center align-middle">Presence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList?.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center align-middle">
                          {item.employee_fname} {item.employee_lname}
                        </td>
                        <td className="text-center align-middle">
                          <button
                            type="submit"
                            onClick={(e) => {
                              handleAttendace(e, item._id);
                            }}
                            className={`btn btn-sm ${
                              absenceData[item._id] ? "btn-danger" : "btn-light"
                            } btn-icon m-1`}
                          >
                            <Icon path={mdiAlphaXCircle} size={1} />
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
