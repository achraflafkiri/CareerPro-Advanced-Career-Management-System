import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllClients, getOneClient } from "../../api/functions/clients";
import DeleteModal from "./ClientDelete";
import "react-toastify/dist/ReactToastify.css";

import Icon from "@mdi/react";
import {
  mdiTextBoxPlusOutline,
  mdiTrashCanOutline,
  mdiPlus,
  mdiReload,
} from "@mdi/js";

const ClientsList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState(null);
  const [deleteForm, setDeleteForm] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [client, setClient] = useState(null);

  const { societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllClients(societeId);
      setDataList(res.data.clients);
    }
    fetchData();
  }, [societeId]);

  const handleGetData = async (event, clientId) => {
    event.preventDefault();
    try {
      const response = await getOneClient(societeId, clientId);
      if (response.data) {
        console.log(response.data.client._id);
        setClient(response.data.client);
        setClientId(response.data.client._id);
        setDeleteForm(response.data.client);
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const fetchData = async () => {
    const res = await getAllClients(societeId);
    setDataList(res.data.clients);
  };

  // Generate sequential IDs starting from 1
  const tableData = dataList?.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  const refresh = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <DeleteModal
        value={deleteForm}
        societeId={societeId}
        clientId={clientId}
        fetchData={fetchData}
      />
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div class="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-3">
                  <h3>Liste des clients</h3>
                  <p class="mb-md-0">{client?.client_name}</p>
                </div>

                <div className="d-flex align-items-center justify-content-between mx-2">
                  <button
                    onClick={refresh}
                    className="btn btn-ref btn-icon mx-1"
                  >
                    <Icon path={mdiReload} size={1} />{" "}
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-add btn-icon mx-1"
                    onClick={() => navigate(`create`)}
                  >
                    <Icon path={mdiPlus} size={1} />{" "}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/societe/${societeId}/`)}
                    className="btn btn-inverse-primary btn-fw"
                  >
                    BACK
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="text-center align-middle">ID</th>
                      <th className="text-center align-middle">Full name</th>
                      <th className="text-center align-middle">Matricule</th>
                      <th className="text-center align-middle">Volume</th>
                      <th className="text-center align-middle">orders</th>
                      <th className="text-center align-middle">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData?.map((client) => (
                      <tr key={client._id}>
                        <td className="text-center align-middle">
                          {client.id}
                        </td>
                        <td className="text-center align-middle">
                          {client.client_name}
                        </td>
                        <td className="text-center align-middle">
                          {client.matricule}
                        </td>
                        <td className="text-center align-middle">
                          {client.volume}
                        </td>
                        <td className="text-center align-middle">
                          {client.commandes.length > 0
                            ? client.commandes.length
                            : "0"}
                        </td>
                        <td className="text-center align-middle">
                          <button
                            onClick={() =>
                              navigate(
                                `/societe/${societeId}/clients/${client._id}/edit`
                              )
                            }
                            className="btn btn-inverse-success btn-icon"
                          >
                            <Icon path={mdiTextBoxPlusOutline} size={1} />
                          </button>{" "}
                          <button
                            className="btn btn-inverse-danger btn-icon"
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteModal"
                            onClick={(event) => {
                              handleGetData(event, client._id);
                            }}
                          >
                            <Icon path={mdiTrashCanOutline} size={1} />
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientsList;
