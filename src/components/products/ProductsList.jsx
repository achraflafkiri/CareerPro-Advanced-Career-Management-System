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
  }, [societeId]);

  const handleGetData = async (event, productId) => {
    event.preventDefault();
    try {
      const response = await getOneProduct(societeId, productId);
      if (response.data) {
        setEditForm(response.data.product);
        setdeleteForm(response.data.product);
        setProductId(response.data.product._id);
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

  const fetchData = async () => {
    const res = await getAllProducts(societeId);
    setDataList(res.data.products);
  };

  return (
    <>
      <ProductCreate fetchData={fetchData} />

      <EditModal
        value={editForm}
        societeId={societeId}
        productId={productId}
        fetchData={fetchData}
      />

      <DeleteModal
        value={deleteForm}
        societeId={societeId}
        productId={productId}
        fetchData={fetchData}
      />

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
                to={`/societe/${societeId}`}
                className="btn btn-primary btn-sm float-end text-white mx-1"
              >
                BACK
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <th className="text-center align-middle">Product name</th>
              <th className="text-center align-middle">Quantity</th>
              <th className="text-center align-middle">Date</th>
              <th className="text-center align-middle"></th>
            </thead>
            {dataList?.map((item, index) => (
              <tr key={index}>
                <td className="text-center align-middle">
                  <Link to={`${item._id}`} className="text-primary nav-link">
                    {item.product_name}
                  </Link>
                </td>
                <td className="text-center align-middle">{item.quantity}</td>
                <td className="text-center align-middle">{item.date}</td>
                <td className="text-center align-middle">
                <button
                          type="submit"
                          className="btn btn-danger btn-sm text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#DeleteModal"
                          onClick={(e) => handleGetData(e, item._id)}
                        >
                          <Icon path={mdiDeleteEmptyOutline} size={1} />
                        </button>
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
