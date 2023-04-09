import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllEmployees, getOneEmployee } from "../../api/functions/employees";
import DeleteModal from "./EmployeeDelete";

import Icon from "@mdi/react";
import { mdiPencil, mdiDeleteEmptyOutline } from "@mdi/js";

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
        console.log("  employeeId **** ", response.data.employee);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DeleteModal
        value={deleteForm}
        societeId={societeId}
        employeeId={employeeId}
      />

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-3">
                  <h3>Liste des employees</h3>
                  <p class="mb-md-0">Societe X.</p>
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
                    <th>Name</th>
                    <th>Prenom</th>
                    <th>CNI</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.employee_fname} {item.employee_lname}
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.date}</td>
                      <td>
                        <Link
                          to={`${item._id}/edit`}
                          class="btn btn-sm btn-light btn-icon m-1"
                        >
                          <Icon path={mdiPencil} size={1} />
                        </Link>
                        <button
                          type="submit"
                          class="btn btn-sm btn-light btn-icon "
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
