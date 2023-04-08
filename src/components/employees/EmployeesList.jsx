import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllEmployees } from "../../api/functions/employees";

const EmployeesCreate = () => {
  const [dataList, setDataList] = useState(null);

  const { societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllEmployees(societeId);
      setDataList(res.data.data.employees);
      console.log(dataList);
    }
    fetchData();
  }, []);

  return (
    <>
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
                    <th></th>
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
                        <button
                          type="submit"
                          class="btn btn-sm btn-primary text-white mb-3"
                          to={`/employee/${item._id}/edit`}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <Link
                          type="button"
                          class="btn btn-sm btn-success text-white mb-3"
                          to={`/employee/${item._id}`}
                        >
                          Détails
                        </Link>
                      </td>
                      <td>
                        <button
                          type="submit"
                          class="btn btn-sm btn-danger text-white mb-3"
                          data-bs-toggle="modal"
                          data-bs-target="#DeleteModal"
                        >
                          Delete
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

export default EmployeesCreate;
