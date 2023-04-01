import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClientForm from "./ClientForm";

const initialData = [
  {
    id: 1,
    nom: "achraf lafkiri",
    matricule: "Arz57",
    volume: "",
  },
];

const ClientsList = () => {
  const [dataList] = useState(initialData);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-3">
                  <h3>Liste des clients</h3>
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
                    <th>Matricule</th>
                    <th>Volume</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.matricule}</td>
                      <td>{item.volume}</td>
                      <td className="d-flex">
                        <button
                          type="submit"
                          class="btn btn-sm btn-danger text-white"
                        >
                          Delete
                        </button>
                        <button
                          type="submit"
                          class="btn btn-sm btn-primary text-white"
                        >
                          Edit
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

export default ClientsList;
