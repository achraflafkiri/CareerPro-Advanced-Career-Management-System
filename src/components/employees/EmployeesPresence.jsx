import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllEmployees } from "../../api/functions/employees";
import { getAllAttendance } from "../../api/functions/Attendance";
import {
  AddNewAttendance,
  RemoveAttendance,
} from "../../api/functions/Attendance";
import { useStateContext } from "../../context/ContextProvider";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { mdiDownloadBox } from "@mdi/js";
import Icon from "@mdi/react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    // console.log("attendanceRes", attendanceRes);
    // console.log("employeesRes", employeesRes);
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
      }
    } catch (err) {
      fetchData();
      console.warn(err.response.data.message);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // });

  // PDF LIST EMPLOYEES
  const employeesPdf = (e) => {
    e.preventDefault();
    const documentDefinition = {
      content: [
        {
          text: "List of Employees",
          style: "header",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: [
              ["First name", "Last name", "Present", "Absence"],
              // please here add the your code
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download("employee-list.pdf");
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
              <button
                className="btn btn-inverse-dark btn-fw mx-2"
                onClick={employeesPdf}
              >
                <span className="button-icon">
                  <Icon path={mdiDownloadBox} size={1} />
                </span>
                <span className="button-text">Download PDF</span>
              </button>
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
