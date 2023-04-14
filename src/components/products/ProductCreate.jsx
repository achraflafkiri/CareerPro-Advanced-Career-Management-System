import React, { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { createNewProduct } from "../../api/functions/products";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const ProductCreate = ({ fetchData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    quantity: "",
    date: new Date().toLocaleDateString(), // set the current date as a string
  });

  const { product_name, description, quantity, date } = formData;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const { token } = useStateContext();
  //  get the id of societe
  const { societeId } = useParams();
  console.log("societeId => ", societeId);

  const handleSubmit = async (event) => {
    console.log("cliked");
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNewProduct(token, formData, societeId);
      if (response.status === 201) {
        toast.success(`${response.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        navigate(`/societe/${societeId}/products`);
        fetchData();
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      toast.warn(`${err.response.data.message}`, {
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
    <div
      className="modal fade"
      id="addProduct"
      tabindex="-1"
      aria-labelledby="addProductLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add new product
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="product_name">Name of product</label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  className="form-control"
                  value={product_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity">
                  How many product ( <em>number</em> )
                </label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  className="form-control"
                  value={quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                  value={date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
