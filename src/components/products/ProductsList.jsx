import React, { useState } from "react";
import ProductCreate from "./ProductCreate";
import { Link, useParams } from "react-router-dom";

const ProductsList = () => {
  const [formData, setFormData] = useState([]);

  const { societeId } = useParams();

  const { product_name, description, vente, quantity, date, Company } =
    formData;

  const handleAddProduct = () => {
    //
  };

  return (
    <>
      <ProductCreate />

      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Liste des produits</h3>
            <div className="d-flex align-items-center justify-content-between mx-2">
              <button
                type="button"
                className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0 mx-1"
                onClick={handleAddProduct}
                data-bs-toggle="modal"
                data-bs-target="#addProduct"
              >
                <i className="mdi mdi-plus text-muted"></i>
              </button>
              <Link
                to={`/societe/${societeId}`}
                className="btn btn-primary btn-sm float-end text-white mx-1"
              >
                BACK
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <th>Name</th>
              <th>Vente</th>
              <th>Quantity</th>
              <th>Date</th>
            </thead>
            <tbody>
              tbody
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
