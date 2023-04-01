import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const data = [
  {
    id: 1,
    nom: "GNF",
    vente: true,
    quantite: 29,
    date: "2023-11-03",
  },
];

const ProductsDetails = () => {
  const [produit] = useState(data);

  const { produitId, societeId } = useParams();

  return (
    <div className="row">
      <div className="col-md-12 grid-margin">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-end flex-wrap">
            <div className="me-md-3 me-xl-5">
              <h2>Données du produit {produitId}.</h2>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <button
              type="submit"
              className="btn btn-light bg-white btn-icon mx-1"
            >
              <i className="mdi mdi-download text-muted"></i>
            </button>
            <Link
              to={`/societe/${societeId}/produits/`}
              className="btn btn-primary text-white mx-1"
            >
              Ajouter produit
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-12 grid-margin">
        <div className="card">
          <div className="card-header"></div>
          {produit?.map((item, index) => (
            <div className="card-body" key={index}>
              <ul className="list-group">
                <li className="list-group-item">ID: {item.id}</li>
                <li className="list-group-item">Nom: {item.nom}</li>
                <li className="list-group-item">Vente: {item.vente}</li>
                <li className="list-group-item">Quantité: {item.quantite}</li>
                <li className="list-group-item">Date: {item.date}</li>
              </ul>
            </div>
          ))}
          <div className="card-footer"></div>
        </div>
      </div>
      <div className="col-md-12 grid-margin">
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <h3>Saisir les informations sur le bon de livraison</h3>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  name="societe"
                  id="societe"
                  placeholder="Societe"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="nombre_de_livraison"
                  id="nombre_de_livraison"
                  placeholder="nombre_de_livraison"
                  className="form-control"
                />
              </div>
              <div className="mb-3 d-flex align-items-center">
                <button
                  type="submit"
                  className="btn btn-info text-white btn-sm mx-1"
                >
                  SEND
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-white btn-sm mx-1"
                >
                  PRINT
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
