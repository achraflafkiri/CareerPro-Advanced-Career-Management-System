import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeesForm from "./EmployeesForm";

const initialData = [
  {
    id: 1,
    nom: "achraf",
    prenom: "lafkiri",
    cni: "EE634598",
  },
];

const EmployeesList = () => {
    const [dataList] = useState(initialData);

    return (
        <>
    <div className="modal fade" id="AddEmployee" tabindex="-1" aria-labelledby="AddEmployeeLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="AddEmployeeLabel">Ajouter un employee</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <EmployeesForm />
      </div>
    </div>
  </div>
</div>


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
                        <button
                            type="button"
                            className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0 mx-1"
                            data-bs-toggle="modal" data-bs-target="#AddEmployee"
                        >
                            <i className="mdi mdi-plus text-muted"></i>
                        </button>
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
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>CNI</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            
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
