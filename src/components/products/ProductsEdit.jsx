import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../api/functions/products";
import { useStateContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";

const SocieteEdit = ({ value, societeId, productId, fetchData }) => {
  const navigate = useNavigate();
  const [newEditVal, setNewEditVal] = useState({
    product_name: "",
    description: "",
    quantity: "",
    date: "",
  });

  const { product_name, description, quantity, date } = newEditVal;

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEditVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (value) {
      setNewEditVal({
        product_name: value.product_name,
        description: value.description,
        quantity: value.quantity,
        date: value.date,
      });
    }
  }, [value]);

  const { token } = useStateContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await updateProduct(
        societeId,
        productId,
        token,
        newEditVal
      );

      if (response.status === 200) {
        fetchData();
        navigate(`/societe/${societeId}/products`);
        toast.success("Product updated successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      class="modal fade"
      id="EditProduct"
      tabindex="-1"
      aria-labelledby="EditModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="EditModalLabel">
              Edit Products
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
                <label htmlFor="product_name">Product name</label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  value={product_name}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <input
                  type="description"
                  name="description"
                  id="description"
                  value={description}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="quantity"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SocieteEdit;
