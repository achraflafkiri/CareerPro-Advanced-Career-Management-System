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

  useEffect(() => {
    fetchData();
  });

  // PDF LIST EMPLOYEES
  const employeesPdf = (e) => {
    e.preventDefault();

    const documentDefinition = {
      content: [
        // {
        //   image: "https://fakeimg.pl/250x100/ff0000/",
        //   width: 100,
        //   height: 100,
        //   alignment: "center",
        //   margin: [0, 50, 0, 0],
        // },
        {
          text: "List of Employees",
          style: "header",
          alignment: "center",
          margin: [0, 20, 0, 20],
        },
        {
          text: `Date: ${date}`,
          style: "info",
          margin: [50, 0, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: [
              ["First name", "Last name", "Present", "Absence"],
              ...dataList?.map((item) => {
                const attendance = attendances?.find(
                  (att) => att.employeeId === item._id
                );
                const isPresent = attendance?.isPresent || false;
                return [
                  item.employee_fname,
                  item.employee_lname,
                  isPresent ? "x" : "",
                  !isPresent ? "x" : "",
                ];
              }),
            ],
          },
          layout: {
            hLineWidth: (i, node) => {
              if (i === 0 || i === node.table.body.length) {
                return 0;
              }
              return i === node.table.headerRows ? 2 : 1;
            },
            vLineWidth: () => 0,
            hLineColor: () => "#ddd",
            paddingLeft: () => 10,
            paddingRight: () => 10,
            paddingTop: () => 5,
            paddingBottom: () => 5,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        info: {
          fontSize: 14,
          italics: true,
          color: "#777",
        },
      },
    };
    pdfMake.createPdf(documentDefinition).download(`employees_${date}.pdf`);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="m-0">Employees Presence</h1>
          <button className="btn btn-primary" onClick={employeesPdf}>
            <Icon path={mdiDownloadBox} size={1} className="me-2" />
            Export to PDF
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
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
                  <td>{item.employee_fname}</td>
                  <td>{item.employee_lname}</td>
                  <td>
                    <input
                      type="radio"
                      name={`attendance${item._id}`}
                      checked={isPresent}
                      onChange={(e) =>
                        handleAttendanceChange(item._id, e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={`attendance${item._id}`}
                      checked={!isPresent}
                      onChange={(e) =>
                        handleAttendanceChange(item._id, !e.target.checked)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPresence;
