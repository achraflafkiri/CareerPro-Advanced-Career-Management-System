import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { deleteAllProducts, deleteProduct } from "../../api/functions/products";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDeleteAll = ({ value, societeId, productId, fetchData }) => {
  const { token } = useStateContext();
  const handleDeleteAllProducts = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteAllProducts(societeId, token);
      if (res.status === 200) {
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
      id="deleteAllProducts"
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
                onClick={(e) => handleDeleteAllProducts(e, societeId)}
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

export default ProductDeleteAll;
