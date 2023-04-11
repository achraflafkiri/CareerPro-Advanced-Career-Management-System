import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createNewClient } from "../../api/functions/clients";
import { useStateContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";
import CommandeCreate from "./commandes/CommandeCreate";
import classNames from "classnames";

const ClientCreate = () => {
  const navigate = useNavigate();
  const { token } = useStateContext();
  const { societeId } = useParams();

  const [formData, setFormData] = useState({
    client_name: "",
    matricule: "",
    volume: "",
  });

  const [clientId, setClientId] = useState(null);
  const [clientAdded, setClientAdded] = useState(false);
  const [disabled, setDisabled] = useState(!societeId);

  useEffect(() => {
    setDisabled(!societeId);
  }, [societeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNewClient(token, formData, societeId);
      if (response.status === 201) {
        setClientAdded(!clientAdded);
        setClientId(response.data.client._id);
        console.log("clientId => ", clientId);
        toast.success(`Added client successfully`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
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
                <h3 className="mt-3 mb-3">Ajouter un client</h3>
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
                      value={formData.client_name}
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
                      value={formData.matricule}
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
                      value={formData.volume}
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
                {clientId && <CommandeCreate clientId={clientId} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCreate;
