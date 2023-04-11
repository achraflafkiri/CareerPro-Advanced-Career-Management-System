import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOneClient, updateClient } from "../../api/functions/clients";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/ContextProvider";
import CommandeEdit from "./commandes/CommandeEdit";

const ClientForm = () => {
  const navigate = useNavigate();
  const { societeId, clientId } = useParams();
  const [newEditVal, setNewEditVal] = useState({
    client_name: "",
    matricule: "",
    volume: "",
  });

  const { client_name, matricule, volume } = newEditVal;

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(!societeId);

  useEffect(() => {
    setDisabled(!societeId);
  }, [societeId]);
  
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
          console.log("client **** ", response.data.client);
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

    handleGetData();
  }, [societeId, clientId]);

  const { token } = useStateContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

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
        navigate(`/societe/${societeId}/clients`);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-16">
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
                <h3 className="mt-3 mb-3">Edit client</h3>
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
                  <button type="submit" className="btn btn-primary">
                    Enregistrer
                  </button>
                  <Link
                    to={`/societe/${societeId}/clients`}
                    className="btn btn-danger ms-3"
                  >
                    Annuler
                  </Link>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                {clientId && <CommandeEdit clientId={clientId} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
