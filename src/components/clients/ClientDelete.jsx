import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { deleteClient } from "../../api/functions/clients";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ClientDelete = ({ value, societeId, clientId }) => {
  const navigate = useNavigate();
  console.log(clientId);
  const { token } = useStateContext();
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await deleteClient(token, societeId, clientId);
      if (response.status === 200) {
        return navigate(`societe/${societeId}/clients`);
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <div
      className="modal fade"
      id="DeleteModal"
      tabindex="-1"
      aria-labelledby="DeleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="DeleteModalLabel">
              Delete Client {value?.Client_name}
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form action="/societe" method="POST">
            <div className="modal-body">
              <div className="modal-title">
                Are you sure you want to delete this Client {value?.Client_name}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light text-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientDelete;
