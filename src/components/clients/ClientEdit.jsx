import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOneClient, updateClient } from "../../api/functions/clients";
import {
  deleteCommande,
  deleteAllcommandes,
} from "../../api/functions/commandes";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/ContextProvider";
import CommandeEdit from "./commandes/CommandeEdit";

import { getAllCommandes } from "../../api/functions/commandes";

import Icon from "@mdi/react";
import { mdiDeleteEmptyOutline } from "@mdi/js";

const ClientForm = () => {
  const { societeId, clientId } = useParams();
  const [newEditVal, setNewEditVal] = useState({
    client_name: "",
    matricule: "",
    volume: "",
  });

  async function fetchData() {
    const res = await getAllCommandes(societeId, clientId);
    setCommands(res.data.commandes);
  }

  const { client_name, matricule, volume } = newEditVal;
  const [commands, setCommands] = useState(null);
  const [disabled, setDisabled] = useState(!societeId);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    setDisabled(!societeId);
    let initialValue = 0;

    if (commands) {
      for (let i = 0; i < commands.length; i++) {
        initialValue += Number(commands[i].quantity);
      }
      setTotalQuantity(initialValue);
      console.log(typeof initialValue);
    }
  }, [societeId, commands]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEditVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await getOneClient(societeId, clientId);

        if (response.data) {
          setNewEditVal({
            client_name: response.data.client.client_name,
            volume: response.data.client.volume,
            matricule: response.data.client.matricule,
          });
        }
      } catch (err) {
        console.error(err.response.data.message);
      }
    };

    handleGetData();
  }, [societeId, clientId]);

  const { token } = useStateContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await updateClient(
        token,
        newEditVal,
        societeId,
        clientId
      );

      if (response.status === 200) {
        toast.success("Client updated successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        fetchData();
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      toast.warn(`${err.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getAllCommandes(societeId, clientId);
      setCommands(res.data.commandes);
    }
    fetchData();
  }, [societeId, clientId]);

  const handleDelete = async (e, commandeId) => {
    e.preventDefault();
    try {
      const res = await deleteCommande(token, societeId, clientId, commandeId);
      if (res.status === 204) {
        fetchData();
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const handleAllDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteAllcommandes(token, societeId, clientId);
      if (res.status === 204) {
        fetchData();
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Client
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  disabled={disabled}
                  onClick={() => {
                    if (clientId) {
                      // setDisabled(!disabled);
                    } else {
                      toast.error(`Please add the client first`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                      });
                    }
                  }}
                >
                  Commande
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 className="mt-3 mb-3 card-title">Edit client</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="client_name" className="form-label">
                      Nom du client
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="client_name"
                      name="client_name"
                      value={client_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="matricule" className="form-label">
                      Matricule
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="matricule"
                      name="matricule"
                      value={matricule}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="volume" className="form-label">
                      Volume
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="volume"
                      name="volume"
                      value={volume}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-inverse-success btn-fw"
                  >
                    Update client
                  </button>
                  <Link
                    to={`/societe/${societeId}/clients`}
                    className="btn btn-inverse-light btn-fw text-dark"
                  >
                    Cancel
                  </Link>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                {clientId && (
                  <CommandeEdit clientId={clientId} fetchData={fetchData} />
                )}

                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <section>
                          <h4 class="card-title">Bordered table</h4>
                          <p class="card-description">
                            {commands && (
                              <div>
                                Number of commandes is{" "}
                                {commands ? commands.length : 0} with total
                                quantity of {totalQuantity}
                              </div>
                            )}
                          </p>
                        </section>
                        <div>
                          <button
                            className="btn btn-sm btn-delete btn-icon"
                            onClick={handleAllDelete}
                          >
                            <Icon path={mdiDeleteEmptyOutline} size={1} />
                          </button>
                        </div>
                      </div>
                      <div class="table-responsive pt-3">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th className="text-center align-middle">
                                Série BC
                              </th>
                              <th className="text-center align-middle">
                                Désignation
                              </th>
                              <th className="text-center align-middle">
                                Quantité
                              </th>
                              <th className="text-center align-middle">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {commands?.map((com) => (
                              <tr key={com._id}>
                                <td className="text-center align-middle">
                                  {com.serie_bc}
                                </td>
                                <td className="text-center align-middle">
                                  {com.designation}
                                </td>
                                <td className="text-center align-middle">
                                  {com.quantity}
                                </td>

                                <td className="text-center align-middle">
                                  <button
                                    className="btn btn-sm btn-light btn-icon text-dark"
                                    onClick={(event) => {
                                      handleDelete(event, com._id);
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
