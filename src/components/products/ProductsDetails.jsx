import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneProduct, updateProduct } from "../../api/functions/products";
import LivraisonCreate from "./livraisons/LivraisonCreate";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/ContextProvider";

const ProductsDetails = () => {
  const { token } = useStateContext();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    quantity: "",
    date: "",
  });

  const { product_name, description, quantity, date } = formData;

  const { societeId, productId } = useParams();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function fetchData() {
    const res = await getOneProduct(societeId, productId);
    setProduct(res.data.product);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await getOneProduct(societeId, productId);
      setProduct(res.data.product);
      setFormData({
        product_name: res.data.product.product_name,
        description: res.data.product.description,
        quantity: res.data.product.quantity,
        date: res.data.product.date,
      });
    }

    fetchData();
  }, [societeId, productId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProduct(societeId, productId, token, formData);
      if (res.data) {
        toast.success(`${res.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        fetchData();
      }
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

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
            <form className="forms-sample">
              <div class="form-group">
                <label for="product_name">Product name</label>
                <input
                  type="text"
                  className="form-control"
                  value={product_name}
                  onChange={handleChange}
                  id="product_name"
                  name="product_name"
                  placeholder="product_name"
                />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={handleChange}
                  id="description"
                  name="description"
                  placeholder="description"
                />
              </div>
              <div class="form-group">
                <label for="quantity">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  value={quantity}
                  onChange={handleChange}
                  id="quantity"
                  name="quantity"
                  placeholder="quantity"
                />
              </div>
              <div class="form-group">
                <label for="date">Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={date}
                  onChange={handleChange}
                  id="date"
                  name="date"
                  placeholder="date"
                />
              </div>
              <div class="form-group">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
      <div className="col-md-12 grid-margin">
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <h3>Saisir les informations sur le bon de livraison</h3>
            <LivraisonCreate />
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
