import React from "react";

const MaterialCreate = () => {
  return (
    <form action="/societe">
      <div className="mb-3">
        <label htmlFor="materiels">Materiels</label>
        <input
          type="text"
          name="materiels"
          id="materiels"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Travail_par_heure">Travail par heure</label>
        <input
          type="text"
          name="Travail_par_heure"
          id="Travail_par_heure"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date">date</label>
        <input type="date" name="date" id="date" className="form-control" />
      </div>
      <div className="mb-3 d-flex">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" className="btn btn-primary">
          Save changes
        </button>
      </div>
    </form>
  );
};

export default MaterialCreate;
