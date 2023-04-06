import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./box.css";
import {
  getAllProducts,
  getAllEmployees,
  getOneCompany,
  getAllClients,
} from "../../api";

const SocieteList = () => {
  const [products, setProducts] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [company, setCompany] = useState(null);
  const [client, setClient] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const { societeId } = useParams();

  // Fetch product data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllProducts(societeId);
        if (res.data) {
          setProducts(res.data.data.products);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [societeId]);

  // Fetch employee data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllEmployees(societeId);
        if (res.data) {
          setEmployees(res.data.data.employees);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [societeId]);

  // Get One company by ID
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getOneCompany(societeId);
        if (res.data) {
          setCompany(res.data.company);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [societeId]);

  // Get One Client by ID
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllClients(societeId);
        console.log(res.data.data.clients);
        if (res.data.data.clients) {
          setClient(res.data.data.clients);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [societeId]);

  // Calculate the time elapsed since the last update
  const elapsed = lastUpdated
    ? Math.round((new Date() - lastUpdated) / 1000)
    : null;
  const timeSinceLastUpdate = elapsed ? `${elapsed} seconds ago` : null;

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body rounded">
              <h2 className="card-title">
                Details of Company{" "}
                <span className="text-info">{company?.company_name}</span>
              </h2>
              <p class="card-text">{company?.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  Last updated {timeSinceLastUpdate}
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
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
        <div className="col-md-12">
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
                    </thead>
                    <tbody>
                      {products?.map((item, index) => (
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
                        </tr>
                      ))}
                    </tbody>
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
                        <td>First name</td>
                        <td>Last name</td>
                        <td>CNI</td>
                        <td>Phone</td>
                      </tr>
                    </thead>
                    <tbody>
                      {employees?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              to={`/product/${item._id}`}
                              className="text-primary nav-link"
                            >
                              {item.employee_fname}
                            </Link>
                          </td>
                          <td>{item.employee_lname}</td>
                          <td>{item.cni}</td>
                          <td>{item.phone}</td>
                        </tr>
                      ))}
                    </tbody>
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
                        <td>Full name</td>
                        <td>Matricule</td>
                        <td>Volume</td>
                      </tr>
                    </thead>
                    <tbody>
                      {client?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.client_name}</td>
                          <td>{item.matricule}</td>
                          <td>{item.volume}</td>
                        </tr>
                      ))}
                    </tbody>
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
