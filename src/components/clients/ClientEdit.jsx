import React from "react";

const ClientForm = () => {
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
                client
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-commande-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-commande"
                type="button"
                role="tab"
                aria-controls="pills-commande"
                aria-selected="false"
              >
                commande
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
              <form className="forms-sample p-3">
                <div className="form-group">
                  <label for="client_name">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="client_name"
                    placeholder="Full Name"
                  />
                </div>
                <div className="form-group">
                  <label for="client_name">Matricule</label>
                  <input
                    type="text"
                    className="form-control"
                    id="matricule"
                    name="matricule"
                    placeholder="Matricule"
                  />
                </div>
                <div className="form-group">
                  <label for="client_name">Volume</label>
                  <input
                    type="text"
                    className="form-control"
                    id="volume"
                    placeholder="Volume"
                  />
                </div>

                <button type="submit" className="btn btn-info me-2">
                  Submit
                </button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-commande"
              role="tabpanel"
              aria-labelledby="pills-commande-tab"
            >
              <form className="forms-sample p-3">
                <div className="form-group">
                  <label for="Serie_bc">Série BC</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Serie_bc"
                    name="Serie_bc"
                    placeholder="Série BC"
                  />
                </div>
                <div className="form-group">
                  <label for="designation">Désignation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="designation"
                    name="designation"
                    placeholder="designation"
                  />
                </div>
                <div className="form-group">
                  <label for="quantity">Quantité</label>
                  <input
                    type="text"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    placeholder="quantity"
                  />
                </div>
                <button type="submit" className="btn btn-info me-2">
                  Submit
                </button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
