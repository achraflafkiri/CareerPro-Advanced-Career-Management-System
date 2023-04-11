import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { deleteClient } from "../../api/functions/clients";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientDelete = ({ value, societeId, clientId, fetchData }) => {
  const { token } = useStateContext();
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await deleteClient(token, societeId, clientId);
      if (response.status === 200) {
        fetchData();
        toast.success(`${response.data.message}`, {
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
              Delete Client {value?.client_name}
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
                Are you sure you want to delete {value?.client_name}
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
