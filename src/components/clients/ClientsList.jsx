import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllClients, getOneClient } from "../../api/functions/clients";
import DeleteModal from "./ClientDelete";

import Icon from "@mdi/react";
import { mdiPencil, mdiDeleteEmptyOutline } from "@mdi/js";

const ClientsList = () => {
  const [dataList, setDataList] = useState(null);
  const [deleteForm, setDeleteForm] = useState(null);
  const [clientId, setClientId] = useState(null);

  const { societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllClients(societeId);
      // setDataList(res.data);
      console.log(res);
      console.log("*** societeId ***", societeId);
    }
    fetchData();
  }, []);

  const handleGetData = async (event, clientId) => {
    event.preventDefault();
    try {
      const response = await getOneClient(societeId, clientId);
      if (response.data) {
        setDeleteForm(response.data.Client);
        setClientId(response.data.client._id);
        console.log("  ClientId **** ", response.data.client);
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
        clientId={clientId}
      />
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
                      <td>{item.client_name}</td>
                      <td>{item.matricule}</td>
                      <td>{item.volume}</td>
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

export default ClientsList;
