import React from "react";

const ClientForm = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <p class="text-dark">Edit information de client</p>
          </div>
          <div className="card-body">
            <form>
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
                <label htmlFor="prenom">prenom</label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  className="form-control"
                  rows="4"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Phone">CNI</label>
                <input
                  type="text"
                  name="cni"
                  id="cni"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-sm text-white">
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <p class="text-dark">Edit Bon de commande</p>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="societ">Societe</label>
                <input
                  type="text"
                  name="societ"
                  id="societ"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="matricule">Matricule</label>
                <input
                  type="text"
                  name="matricule"
                  id="matricule"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-sm text-white">
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
