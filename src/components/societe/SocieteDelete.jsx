import React from "react";

const SocieteDelete = () => {
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
            Are you sure you want to delete this societe
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light text-dark"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-danger text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocieteDelete;
