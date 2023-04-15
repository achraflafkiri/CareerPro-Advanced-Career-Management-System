import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiDownload } from "@mdi/js";
import { getAllEmployees, markAbsences } from "../../api/functions/employees";
import { useParams } from "react-router-dom";
import { mdiAlphaXCircle } from "@mdi/js";
import { useStateContext } from "../../context/ContextProvider";

const EmployeesPresence = () => {
  const [dataList, setDataList] = useState(null);
  const [absenceData, setAbsenceData] = useState({});

  const { societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllEmployees(societeId);
      setDataList(res.data.employees);
    }
    fetchData();
  }, [societeId]);

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

  // Set initial state for selected date and checkbox
  const [selectedDate, setSelectedDate] = useState(todayString);

  // Handle date and checkbox changes
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const { token } = useStateContext();
  const handleAttendace = async (e, employeeId) => {
    console.log("absenceData => ", absenceData);

    e.preventDefault();
    // console.log(employeeId, selectedDate);
    const data = {
      date: selectedDate,
    };
    try {
      const response = await markAbsences(token, data, societeId, employeeId);
      if (response.data) {
        // console.log("msg ", response.data.message);
        console.log("is_absence -> ", response.data.absence?.is_absence);
        setAbsenceData((prevState) => ({
          ...prevState,
          [employeeId]: response.data.absence.is_absence ? true : false,
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
              <div className="d-flex justify-content-between align-items-center">
                <div className="icons">
                  <button
                    type="submit"
                    className="btn btn-sm btn-light btn-icon m-1"
                  >
                    <Icon path={mdiDownload} size={1} />
                  </button>
                </div>
                <form className="forms-sample">
                  <div className="form-group">
                    <label htmlFor=""></label>
                    <select
                      className="form-control"
                      id="exampleSelectGender"
                      value={selectedDate}
                      onChange={(event) => handleChange(event)}
                    >
                      <option value={todayString}>{todayString}</option>
                      <option value={yesterdayString}>{yesterdayString}</option>
                    </select>
                  </div>
                </form>
              </div>
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
