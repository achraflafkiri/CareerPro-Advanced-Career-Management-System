import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const EmployeeAbsence = () => {
  const { employeeId } = useParams();
  const [rows, setRows] = useState([]);

  const handleAddClick = () => {
    const today = new Date().toISOString().substr(0, 10);
    const newRow = {
      id: rows.length + 1,
      date: today,
      absence: false, // added absence property
      attendance: false, // added attendance property
      squint: false, // added squint property
    };
    setRows([...rows, newRow]);
  };

  const handleAbsenceChange = (id) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            absence: !row.absence,
          };
        }
        return row;
      })
    );
  };

  const handleAttendeeClick = (id) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            attendance: !row.attendance,
          };
        }
        return row;
      })
    );
  };

  const handleSquintClick = (id) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            squint: !row.squint,
          };
        }
        return row;
      })
    );
  };

  const handleDateChange = (id, value) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            date: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="d-flex justify-content-between flex-wrap">
              <div className="d-flex align-items-end flex-wrap">
                <div className="me-md-3 me-xl-5">
                  <h4>Enregistrement des absences</h4>
                  <p className="mb-md-0">Achraf lafkiri.</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-end flex-wrap">
                <button
                  type="button"
                  className="btn btn-light bg-white btn-icon me-3 d-none d-md-block"
                >
                  <i className="mdi mdi-content-save text-muted"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0"
                  onClick={handleAddClick}
                >
                  <i className="mdi mdi-plus text-muted"></i>
                </button>
                <Link
                  to={`/societe/1/employees/${employeeId}`}
                  className="btn btn-info mt-2 mt-xl-0 text-white"
                >
                  BACK
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-16">
            <div className="card">
              <div className="card-header"></div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Attendance</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <Icon
                            icon="icon-park-outline:grinning-face-with-squinting-eyes"
                            onClick={() => {
                              handleAttendeeClick(row.id);
                            }}
                            style={{ width:"60px", height:"60px", color: row.attendance ? "green" : "" }}
                            className={row.attendance ? "icon-green" : ""}
                          />
                          <Icon
                            icon="ph:smiley-x-eyes-bold"
                            onClick={() => {
                              handleAbsenceChange(row.id);
                            }}
                            style={{ width:"60px", height:"60px" , color: row.absence ? "red" : "" }}
                            className={row.absence ? "icon-red" : ""}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            name="date"
                            value={row.date}
                            id="date"
                            className="form-control"
                            onChange={(e) => {
                              handleDateChange(row.id, e.target.value);
                            }}
                          />
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
    </>
  );
};

export default EmployeeAbsence;
