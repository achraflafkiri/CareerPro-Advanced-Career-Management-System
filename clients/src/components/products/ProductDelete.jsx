import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { deleteProduct } from "../../api/functions/products";

const ProductDelete = ({ value, societeId, productId, fetchData }) => {
  const { token } = useStateContext();
  const handleDelete = async (event, societeId) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await deleteProduct(token, societeId, productId);
      if (response.status === 204) {
        fetchData();
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <div
      className="modal fade"
      id="DeleteModal"
      tabindex="-1"
      aria-labelledby="DeleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="DeleteModalLabel">
              Delete Product {value?.product_name}
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form action="/societe" method="POST">
            <div className="modal-body">
              <div className="modal-title">
                Are you sure you want to delete this product
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light text-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger text-white"
                onClick={(e) => handleDelete(e, societeId)}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDelete;
