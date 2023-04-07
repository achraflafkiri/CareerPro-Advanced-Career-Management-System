import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { deleteCompany } from "../../api/index";

const SocieteDelete = ({ value, societeId }) => {
  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (input === value?.company_name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [input, value]);

  const { token } = useStateContext();
  const handleDelete = async (event, societeId) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await deleteCompany(societeId, token);
      if (response.status === 200) {
        console.log("societe updated successfully!");
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      console.log(err.response);
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
              Delete Societe
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="modal-title">
              Are you sure you want to delete this societe
            </div>
            <br />
            <p className="mb-2">
              To confirm type " <strong>{value?.company_name}</strong> " in the
              box below
            </p>
            <br />
            <div className="mb-2">
              <input
                type="text"
                className="form-control border-danger border-raduis-10"
                name="cofirm"
                id="cofirm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
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
              onClick={(e) => handleDelete(e, societeId)}
              disabled={isDisabled}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocieteDelete;
