import React, { useState, useEffect } from "react";
import {
  createNewLivraison,
  getAllLivraisons,
  deleteLivraison,
  deleteAllLivraisons,
} from "../../../api/functions/Livraisons";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../../context/ContextProvider";
import { mdiDeleteEmptyOutline, mdiReload } from "@mdi/js";
import Icon from "@mdi/react";

const LivraisonCreate = () => {
  const { societeId, productId } = useParams();
  const { token } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState(null);
  const [newLivraison, setNewLivraison] = useState({
    serie_bc: "",
    designation: "",
    quantity: "",
  });

  const { serie_bc, designation, quantity } = newLivraison;

  useEffect(() => {
    async function fetchData() {
      const res = await getAllLivraisons(societeId, productId);
      setDataList(res.data.livraisons);
    }
    fetchData();
  }, [societeId, productId]);

  const fetchData = async () => {
    const res = await getAllLivraisons(societeId, productId);
    if (res.data) {
      setDataList(res.data.livraisons);
      console.log(res.data.livraisons);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewLivraison((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNewLivraison(
        token,
        newLivraison,
        societeId,
        productId
      );
      if (response.status === 201) {
        fetchData();
        toast.info(`${response.data.message}`, {
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
      fetchData();
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, livraisonId) => {
    e.preventDefault();
    try {
      const res = await deleteLivraison(
        token,
        societeId,
        productId,
        livraisonId
      );

      if (res.status === 204) {
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

  const handleDeleteAll = async (e) => {
    e.preventDefault();
    console.log("click");

    try {
      const res = await deleteAllLivraisons(token, societeId, productId);

      if (res.status === 204) {
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

  const refresh = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleCreate} className="forms-sample py-3">
              <div className="mb-3">
                <label htmlFor="serie_bc" className="form-label">
                  Série BC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="serie_bc"
                  name="serie_bc"
                  value={serie_bc}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="designation" className="form-label">
                  Désignation
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="designation"
                  name="designation"
                  value={designation}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantité
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-fw text-white"
              >
                Create livraison
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="card-title">List of bons</p>
                <p className="card-description">
                  Number of bons is {dataList?.length}
                </p>
              </div>
              <div className="btns row">
                <button
                  className="btn btn-sm btn-danger btn-icon text-white"
                  onClick={handleDeleteAll}
                >
                  <Icon path={mdiDeleteEmptyOutline} size={1} />
                </button>
                <button
                  onClick={refresh}
                  className="btn btn-ref btn-icon btn-fw mx-1"
                >
                  <Icon path={mdiReload} size={1} />{" "}
                </button>
              </div>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center align-middle">Serie_bc</th>
                  <th className="text-center align-middle">Designation</th>
                  <th className="text-center align-middle">Quantity</th>
                  <th className="text-center align-middle">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataList?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center align-middle">
                      {item.serie_bc}
                    </td>
                    <td className="text-center align-middle">
                      {item.designation}
                    </td>
                    <td className="text-center align-middle">
                      {item.quantity}
                    </td>
                    <td className="text-center align-middle">
                      <button
                        className="btn btn-sm btn-light btn-icon text-dark"
                        onClick={(event) => {
                          handleDelete(event, item._id);
                        }}
                      >
                        <Icon path={mdiDeleteEmptyOutline} size={1} />
                      </button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivraisonCreate;
