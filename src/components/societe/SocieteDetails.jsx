import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./box.css";
import { getAllProducts } from "../../api";

const SocieteList = ({ handleNavIds }) => {
  const [id, setId] = useState("");

  const { societeId } = useParams();

  useEffect(() => {
    setId(societeId);
    handleNavIds(id);
  });

  const [dataProduct, setDataProduct] = useState(null);

  useEffect(() => {
    async function fetchData_products() {
      const res = await getAllProducts();
      setDataProduct(res.data.data.Products);
      console.log(dataProduct);
    }
    fetchData_products();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-16">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="produit-tab"
                data-bs-toggle="tab"
                data-bs-target="#produit"
                type="button"
                role="tab"
                aria-controls="produit"
                aria-selected="false"
              >
                produit
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="employee-tab"
                data-bs-toggle="tab"
                data-bs-target="#employee"
                type="button"
                role="tab"
                aria-controls="employee"
                aria-selected="true"
              >
                Employee
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="client-tab"
                data-bs-toggle="tab"
                data-bs-target="#client"
                type="button"
                role="tab"
                aria-controls="client"
                aria-selected="false"
              >
                client
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="material-tab"
                data-bs-toggle="tab"
                data-bs-target="#material"
                type="button"
                role="tab"
                aria-controls="material"
                aria-selected="false"
              >
                material
              </button>
            </li>
          </ul>
        </div>
        <div className="col-md-16">
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade"
              id="produit"
              role="tabpanel"
              aria-labelledby="produit-tab"
            >
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Date</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </thead>
                    {dataProduct?.map((item, index) => (
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
                            class="btn  btn-primary btn-sm text-white mb-3"
                          >
                            <Link to={`/${item._id}`}>Edit</Link>
                          </button>
                        </td>
                        <td>
                          <Link
                            type="button"
                            class="btn  btn-success btn-sm text-white mb-3"
                            to={`/product/${item._id}`}
                          >
                            Détails
                          </Link>
                        </td>
                        <td>
                          <button
                            type="submit"
                            class="btn  btn-danger btn-sm text-white mb-3"
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteModal"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}{" "}
                  </table>
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade show active"
              id="employee"
              role="tabpanel"
              aria-labelledby="employee-tab"
            >
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>nom</td>
                        <td>prenom</td>
                        <td>address</td>
                        <td>phone</td>
                        <td>email</td>
                        <td>cni</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade"
              id="client"
              role="tabpanel"
              aria-labelledby="client-tab"
            >
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>nom</td>
                        <td>address</td>
                        <td>phone</td>
                        <td>cni</td>
                        <td>email</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade"
              id="material"
              role="tabpanel"
              aria-labelledby="material-tab"
            >
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>nom</td>
                        <td>desc</td>
                        <td>travail par heure</td>
                        <td>date</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocieteList;
