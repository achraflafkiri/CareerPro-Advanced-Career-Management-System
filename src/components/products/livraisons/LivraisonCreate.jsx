import React, { useState, useEffect } from "react";
import {
  createNewLivraison,
  getAllLivraisons,
} from "../../../api/functions/Livraisons";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { useStateContext } from "../../../context/ContextProvider";
import { tr } from "date-fns/locale";

const LivraisonCreate = ({ productId }) => {
  const { societeId } = useParams();
  const { token } = useStateContext();
  const [dataList, setDataList] = useState(null);
  const [newLivraison, setNewLivraison] = useState({
    serie_bc: "",
    designation: "",
    quantity: "",
  });

  const { serie_bc, designation, quantity } = newLivraison;

  const fetchData = async () => {
    const res = await getAllLivraisons(societeId);
    setDataList(res.data.livraison);
    console.log("res.data.livraison ", res.data);
  };

  useEffect(() => {
    fetchData();
  });

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
        toast.success(`Livraison added successfully`, {
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
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Input size</h4>
            <p className="card-description">
              Add classes like <code>.form-control-lg</code> and{" "}
              <code>.form-control-sm</code>.
            </p>

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
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              <Link
                to={`/societe/${societeId}/products`}
                className="btn btn-light text-dark ml-2"
              >
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Serie_bc</th>
                  <th>Designation</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {dataList?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.serie_bc}</td>
                    <td>{item.designation}</td>
                    <td>{item.quantity}</td>
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
