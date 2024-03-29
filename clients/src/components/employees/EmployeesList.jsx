import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllEmployees, getOneEmployee } from "../../api/functions/employees";
import DeleteModal from "./EmployeeDelete";
import Icon from "@mdi/react";
import {
  mdiPencil,
  mdiTrashCanOutline,
  mdiPlus,
  mdiNoteCheck,
  mdiReload,
} from "@mdi/js";

const EmployeesList = () => {
  const navigate = useNavigate();
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
  }, [societeId]);

  const handleGetData = async (event, employeeId) => {
    event.preventDefault();
    try {
      const response = await getOneEmployee(societeId, employeeId);

      if (response.data) {
        setdeleteForm(response.data.employee);
        setEmployeeId(response.data.employee._id);
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const fetchData = async () => {
    const res = await getAllEmployees(societeId);
    setDataList(res.data.employees);
  };

  const refresh = (e) => {
    e.preventDefault();
    fetchData();
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
            <div class="card-body">
              <div className="d-flex align-items-center justify-content-between my-3">
                <div>
                  <h3 className="card-title">Liste des employees</h3>
                  <p class="mb-md-0">
                    Number of employees is {dataList?.length}
                  </p>
                </div>

                <div>
                  <button
                    onClick={refresh}
                    className="btn btn-ref btn-icon mx-1"
                  >
                    <Icon path={mdiReload} size={1} />{" "}
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/societe/${societeId}/employees/attendances`)
                    }
                    className="btn btn-details btn-icon mx-1"
                  >
                    <Icon path={mdiNoteCheck} size={1} />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/societe/${societeId}/employees/create`)
                    }
                    className="btn btn-add btn-icon mx-1"
                  >
                    <Icon path={mdiPlus} size={1} />
                  </button>
                  <button
                    onClick={() => navigate(`/societe/${societeId}`)}
                    className="btn btn-inverse-primary btn-fw"
                  >
                    BACK
                  </button>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-center align-middle">Full name</th>
                    <th className="text-center align-middle">Phone</th>
                    <th className="text-center align-middle">CNI</th>
                    <th className="text-center align-middle">E-mail</th>
                    <th className="text-center align-middle">salary</th>
                    <th className="text-center align-middle"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle">
                        {item.employee_fname} {item.employee_lname}
                      </td>
                      <td className="text-center align-middle">{item.phone}</td>
                      <td className="text-center align-middle">{item.cni}</td>
                      <td className="text-center align-middle">{item.email}</td>
                      <td className="text-center align-middle">
                        {item.salary}
                      </td>
                      <td className="text-center align-middle">
                        <button
                          onClick={() => navigate(`${item._id}/edit`)}
                          className="btn btn-inverse-success btn-icon"
                        >
                          <Icon path={mdiPencil} size={1} />
                        </button>
                        <button
                          type="submit"
                          className="btn btn-inverse-danger btn-icon mx-1"
                          data-bs-toggle="modal"
                          data-bs-target="#DeleteModal"
                          onClick={(e) => handleGetData(e, item._id)}
                        >
                          <Icon path={mdiTrashCanOutline} size={1} />
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
