import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneProduct } from "../../api/functions/products";

const ProductsDetails = () => {
  const [product, setProduct] = useState(null);

  const { productId, societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getOneProduct(societeId, productId);
      console.log(res.data.product);
      setProduct(res.data.product);
      console.log("product.product_name => ", product.product_name);
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12 grid-margin">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-end flex-wrap">
            <div className="me-md-3 me-xl-5">
              <h2>{product?.product_name} details</h2>
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
              <li className="list-group-item">Nom: {product?.description}</li>
              <li className="list-group-item">Quantité: {product?.quantity}</li>
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
