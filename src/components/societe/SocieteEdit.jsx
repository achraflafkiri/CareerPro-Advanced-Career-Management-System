import React from "react";

const SocieteEdit = () => {
  return (
    <div
      class="modal fade"
      id="EditModal"
      tabindex="-1"
      aria-labelledby="EditModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="EditModalLabel">
              Edit Societe
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form action="/societe">
            <div class="modal-body">
              <div className="mb-3">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="Address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
              type="button"
              className="btn btn-light text-dark"
              data-bs-dismiss="modal"
            >
              Close
            </button>
              <button type="button" class="btn btn-info text-white">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SocieteEdit;
