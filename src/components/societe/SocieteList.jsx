import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditModal from "./SocieteEdit";
import DeleteModal from "./SocieteDelete";
import { getAllCompanies } from "../../api";

const initialSocieteList = [];

const SocieteList = () => {
  const [dataList, setDataList] = useState(initialSocieteList);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllCompanies();
      console.log(res);
      if (res.data) {
        setDataList(res.data.data.companies);
        console.log(dataList);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <EditModal />

      <DeleteModal />

      <div class="row">
        <div class="col-md-16">
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
                    <th>Name</th>
                    <th>Description</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Link
                          to={`/societe/${item._id}`}
                          className="text-primary nav-link"
                        >
                          {item.company_name}
                        </Link>
                      </td>
                      <td>{item.description}</td>
                      <td>{item.address}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <button
                          type="submit"
                          class="btn btn-sm btn-danger text-white mb-3"
                          data-bs-toggle="modal"
                          data-bs-target="#DeleteModal"
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
