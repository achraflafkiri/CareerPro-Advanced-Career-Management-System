import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createNewCommande } from "../../../api/functions/commandes";
import { useStateContext } from "../../../context/ContextProvider";

const CommandeEdit = ({ clientId, commandeId, fetchData }) => {
  const { societeId } = useParams();
  const { token } = useStateContext();

  const [newCommande, setNewCommande] = useState({
    serie_bc: "",
    designation: "",
    quantity: "",
  });

  const { serie_bc, designation, quantity } = newCommande;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCommande((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNewCommande(
        token,
        newCommande,
        societeId,
        clientId
      );
      if (response.status === 201) {
        fetchData();
        console.log(response.data);
        toast.info(`${response.data.message}`, {
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
      toast.error(`${err.response.data.message}`, {
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
        <form onSubmit={handleCreate} className="py-3">
          <div className="mb-3">
            <label htmlFor="serie_bc" className="form-label">
              Série BC
            </label>
            <input
              type="text"
              className="form-control"
              id="serie_bc"
              name="serie_bc"
              value={serie_bc}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="designation" className="form-label">
              Désignation
            </label>
            <input
              type="text"
              className="form-control"
              id="designation"
              name="designation"
              value={designation}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantité
            </label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-inverse-primary btn-fw">
            Create commande
          </button>
          <Link
            to={`/societe/${societeId}/clients`}
            className="btn btn-light text-dark ml-2"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CommandeEdit;
