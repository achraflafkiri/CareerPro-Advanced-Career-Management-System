import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOneClient, updateClient } from "../../api/functions/clients";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/ContextProvider";

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
      <div className="card">
        <div className="card-body">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-client-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-client"
                type="button"
                role="tab"
                aria-controls="pills-client"
                aria-selected="true"
              >
                Edit Client
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-client"
              role="tabpanel"
              aria-labelledby="pills-client-tab"
            >
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="client_name" className="form-label">
                    Client Name
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
                <div className="form-group">
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
                <div className="form-group">
                  <label htmlFor="volume" className="form-label">
                    Volume
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="volume"
                    name="volume"
                    value={volume}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn  btn-primary  text-white"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <Link
                    to={`/societe/${societeId}/clients`}
                    className="btn  btn-light  text-dark text-dark ms-2"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
