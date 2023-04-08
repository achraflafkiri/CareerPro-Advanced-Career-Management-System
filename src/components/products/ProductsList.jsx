import React, { useEffect, useState } from "react";
import ProductCreate from "./ProductCreate";
import { Link, useParams } from "react-router-dom";
import { getAllProducts, getOneProduct } from "../../api/functions/products";
import { toast } from "react-toastify";

import EditModal from "./ProductsEdit";
import DeleteModal from "./ProductDelete";

import Icon from "@mdi/react";
import { mdiPencil, mdiDeleteEmptyOutline } from "@mdi/js";

const ProductsList = () => {
  const [dataList, setDataList] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [deleteForm, setdeleteForm] = useState(null);
  const [productId, setProductId] = useState(null);

  const { societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllProducts(societeId);
      setDataList(res.data.products);
    }
    fetchData();
  }, []);

  const handleGetData = async (event, productId) => {
    event.preventDefault();
    try {
      const response = await getOneProduct(societeId, productId);
      if (response.data) {
        setEditForm(response.data.product);
        setdeleteForm(response.data.product);
        setProductId(response.data.product);
        console.log(response.data.product);
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
    <>
      <ProductCreate />

      <EditModal value={editForm} societeId={societeId} productId={productId} />

      <DeleteModal value={deleteForm} societeId={societeId} />

      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Liste des produits</h3>
            <div className="d-flex align-items-center justify-content-between mx-2">
              <button
                type="button"
                className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0 mx-1"
                data-bs-toggle="modal"
                data-bs-target="#addProduct"
              >
                <i className="mdi mdi-plus text-muted"></i>
              </button>
              <Link
                to={`/product/`}
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
              <th>Quantity</th>
              <th>Date</th>
              <th></th>
            </thead>
            {dataList?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/product/${item._id}`}
                    className="text-primary nav-link"
                  >
                    {item.product_name}
                  </Link>
                </td>
                <td>{item.quantity}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    type="submit"
                    class="btn btn-sm btn-light btn-icon m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#EditProduct"
                    onClick={(e) => handleGetData(e, item._id)}
                  >
                    <Icon path={mdiPencil} size={1} />
                  </button>
                  <button
                    type="submit"
                    class="btn btn-sm btn-light btn-icon "
                    data-bs-toggle="modal"
                    data-bs-target="#DeleteModal"
                    onClick={(e) => handleGetData(e, item._id)}
                  >
                    <Icon path={mdiDeleteEmptyOutline} size={1} />
                  </button>{" "}
                </td>
              </tr>
            ))}{" "}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
