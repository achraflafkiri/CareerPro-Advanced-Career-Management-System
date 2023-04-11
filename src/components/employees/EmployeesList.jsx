import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllEmployees, getOneEmployee } from "../../api/functions/employees";
import DeleteModal from "./EmployeeDelete";

import Icon from "@mdi/react";
import { mdiPencil, mdiDeleteEmptyOutline } from "@mdi/js";
import { toast } from "react-toastify";

const EmployeesList = () => {
  const [dataList, setDataList] = useState(null);
  const [deleteForm, setdeleteForm] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);

  const { societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllEmployees(societeId);
      setDataList(res.data.employees);
    }
    fetchData();
  }, []);

  const handleGetData = async (event, employeeId) => {
    event.preventDefault();
    try {
      const response = await getOneEmployee(societeId, employeeId);

      if (response.data) {
        setdeleteForm(response.data.employee);
        setEmployeeId(response.data.employee._id);
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

  const fetchData = async () => {
    const res = await getAllEmployees(societeId);
    setDataList(res.data.products);
  };

  return (
    <>
      <DeleteModal
        value={deleteForm}
        societeId={societeId}
        employeeId={employeeId}
        fetchData={fetchData}
      />

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-3">
                  <h3>Liste des employees</h3>
                  <p class="mb-md-0"></p>
                </div>

                <div className="d-flex align-items-center justify-content-between mx-2">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm float-end text-white mx-1"
                  >
                    SAVE
                  </button>
                  <Link
                    to={`/societe/${societeId}/employees/create`}
                    className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0 mx-1"
                  >
                    <i className="mdi mdi-plus text-muted"></i>
                  </Link>
                  <Link
                    to="/societe/"
                    className="btn btn-primary btn-sm float-end text-white mx-1"
                  >
                    BACK
                  </Link>
                </div>
              </div>
            </div>

            <div class="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center align-middle">Full name</th>
                    <th className="text-center align-middle">Phone</th>
                    <th className="text-center align-middle">CNI</th>
                    <th className="text-center align-middle">E-mail</th>
                    <th className="text-center align-middle">Role</th>
                    <th className="text-center align-middle"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle">
                        {item.employee_fname} {item.employee_lname}
                      </td>
                      <td className="text-center align-middle">{item.cni}</td>
                      <td className="text-center align-middle">{item.phone}</td>
                      <td className="text-center align-middle">{item.email}</td>
                      <td className="text-center align-middle">{item.role}</td>
                      <td className="text-center align-middle">
                        <Link
                          to={`${item._id}/edit`}
                          className="btn btn-sm btn-light btn-icon"
                        >
                          <Icon path={mdiPencil} size={1} />
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-sm btn-light btn-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#DeleteModal"
                          onClick={(e) => handleGetData(e, item._id)}
                        >
                          <Icon path={mdiDeleteEmptyOutline} size={1} />
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
    </>
  );
};

export default EmployeesList;
