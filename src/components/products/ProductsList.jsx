import React, { useEffect, useState } from "react";
import ProductCreate from "./ProductCreate";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  deleteAllProducts,
  getAllProducts,
  getOneProduct,
} from "../../api/functions/products";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Icon from "@mdi/react";
import {
  mdiTextBoxPlusOutline,
  mdiPlus,
  mdiDeleteEmptyOutline,
  mdiTrashCanOutline,
  mdiReload,
} from "@mdi/js";

import DeleteModal from "./ProductDelete";
import { useStateContext } from "../../context/ContextProvider";

const ProductsList = () => {
  const navigate = useNavigate();

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

  const navigateToDetails = (e, productId) => {
    e.preventDefault();
    navigate(`${productId}`);
  };

  const refresh = (e) => {
    e.preventDefault();
    fetchData();
  };

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
    <>
      <ProductCreate fetchData={fetchData} />

      <DeleteModal
        value={deleteForm}
        societeId={societeId}
        productId={productId}
        fetchData={fetchData}
      />

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between my-3">
                <div>
                  <h3 className="card-title">Liste of products</h3>
                  <p class="mb-md-0">
                    Number of products is {dataList?.length}
                  </p>
                </div>

                <div>
                  <button
                    onClick={handleDeleteAllProducts}
                    className="btn btn-delete btn-icon btn-fw mx-1"
                  >
                    <Icon path={mdiTrashCanOutline} size={1} />
                  </button>
                  <button
                    onClick={refresh}
                    className="btn btn-ref btn-icon btn-fw mx-1"
                  >
                    <Icon path={mdiReload} size={1} />{" "}
                  </button>
                  <button
                    className="btn btn-add btn-icon btn-fw mx-1"
                    data-bs-toggle="modal"
                    data-bs-target="#addProduct"
                  >
                    <Icon path={mdiPlus} size={1} />
                  </button>
                  <button
                    onClick={() => navigate(`/societe/${societeId}`)}
                    className="btn btn-inverse-primary btn-fw"
                  >
                    BACK
                  </button>
                </div>
              </div>

              <table className="table table-striped">
                <thead>
                  <th className="text-center align-middle">Product name</th>
                  <th className="text-center align-middle">Quantity</th>
                  <th className="text-center align-middle">Date</th>
                  <th className="text-center align-middle"></th>
                </thead>
                <tbody>
                  {dataList?.map((item) => (
                    <tr key={item._id}>
                      <td className="text-center align-middle">
                        {item.product_name}
                      </td>
                      <td className="text-center align-middle">
                        {item.quantity}
                      </td>
                      <td className="text-center align-middle">
                        {format(new Date(item.date), "dd/MM/yyyy")}
                      </td>{" "}
                      <td className="text-center align-middle">
                        <button
                          className="btn btn-sm btn-light btn-icon mx-2"
                          onClick={(e) => {
                            handleGetData(e, item._id);
                            navigateToDetails(e, item._id);
                          }}
                        >
                          <Icon path={mdiTextBoxPlusOutline} size={1} />
                        </button>

                        <button
                          type="submit"
                          className="btn btn-sm btn-light btn-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#DeleteModal"
                          onClick={(e) => handleGetData(e, item._id)}
                        >
                          <Icon path={mdiDeleteEmptyOutline} size={1} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
