import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditModal from "./SocieteEdit";
import DeleteModal from "./SocieteDelete";

const initialSocieteList = [
  {
    id: "1",
    nom: "Societe X",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "2",
    nom: "Societe Y",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "3",
    nom: "Societe Z",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const SocieteList = () => {
  const [dataList] = useState(initialSocieteList);

  return (
    <>
      
        <EditModal />

        <DeleteModal />

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h3>
                Liste des sociétés
                <Link
                  to="/societe/create"
                  class="btn btn-primary btn-sm float-end text-white"
                >
                  Ajouter une societé
                </Link>
              </h3>
            </div>
            <div class="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>nom</th>
                    <th>description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>
                        <Link to={`/societe/${item.id}`}>{item.nom}</Link>
                      </td>
                      <td>{item.description}</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="submit"
                          class="btn btn-sm btn-danger text-white mb-3"
                          data-bs-toggle="modal" data-bs-target="#DeleteModal"
                        >
                          Delete
                        </button>
                        <button
                          type="submit"
                          class="btn btn-sm btn-primary text-white mb-3"
                          data-bs-toggle="modal"
                          data-bs-target="#EditModal"
                        >
                          Edit
                        </button>
                        <Link
                          type="button"
                          class="btn btn-sm btn-success text-white mb-3"
                          to={`/societe/${item.id}`}
                        >
                          Détails
                        </Link>
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

export default SocieteList;
