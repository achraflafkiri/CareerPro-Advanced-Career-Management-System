import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneProduct } from "../../api/functions/products";
import LivraisonCreate from "./livraisons/LivraisonCreate";

const ProductsDetails = () => {
  const [product, setProduct] = useState(null);

  const { societeId, productId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getOneProduct(societeId, productId);
      setProduct(res.data.product);
    }
    fetchData();
  }, [societeId, productId]);

  return (
    <div className="row">
      <div className="col-md-12 grid-margin">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-end justify-content-between flex-wrap">
            <div className="me-md-3 me-xl-5">
              <h2>{product?.product_name} details</h2>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <Link
              to={`/societe/${societeId}/products/`}
              className="btn btn-primary text-white mx-1"
            >
              Ajouter product
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-12 grid-margin">
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Nom: {product?.product_name}</li>
              <li className="list-group-item">
                Description: {product?.description}
              </li>
              <li className="list-group-item">Quantity: {product?.quantity}</li>
              <li className="list-group-item">Date: {product?.date}</li>
            </ul>{" "}
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
      <div className="col-md-12 grid-margin">
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <h3>Saisir les informations sur le bon de livraison</h3>
            <LivraisonCreate productId={productId} />
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
