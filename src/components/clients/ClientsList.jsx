import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllClients, getOneClient } from "../../api/functions/clients";
import DeleteModal from "./ClientDelete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Icon from "@mdi/react";
import { mdiPencil, mdiDeleteEmptyOutline } from "@mdi/js";

const ClientsList = () => {
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
      setDeleteForm(response.data.clients);
      setClient(response.data.clients);
      setClientId(response.data.clients._id);
      console.log("  *** ", response.data.clients._id);
    } catch (err) {
      console.error(err);
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
                    type="submit"
                    className="btn btn-success btn-sm float-end text-white mx-1"
                  >
                    SAVE
                  </button>
                  <Link
                    type="button"
                    className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0 mx-1"
                    to={`create`}
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
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="text-center align-middle">ID</th>
                      <th className="text-center align-middle">Full name</th>
                      <th className="text-center align-middle">Matricule</th>
                      <th className="text-center align-middle">Volume</th>
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
                          <Link
                            to={`create`}
                            className="btn btn-sm btn-light btn-icon m-1 text-dark"
                            onClick={(event) =>
                              handleGetData(event, client._id)
                            }
                          >
                            <Icon path={mdiPencil} size={1}  />
                          </Link>{" "}
                          <button
                            className="btn btn-sm btn-light btn-icon text-dark"
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteModal"
                            onClick={(event) => {
                              handleGetData(event, client._id);
                            }}
                          >
                            <Icon
                              path={mdiDeleteEmptyOutline}
                              size={1}
                              
                            />
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
