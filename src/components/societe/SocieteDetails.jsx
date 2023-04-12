import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./box.css";
import { getAllProducts } from "../../api/functions/products";
import { getAllEmployees } from "../../api/functions/employees";
import { getOneCompany } from "../../api/functions/companies";
import { getAllClients } from "../../api/functions/clients";
import { getAllMaterials } from "../../api/functions/materials";
import Icon from "@mdi/react";
import { mdiPlusBox } from "@mdi/js";
import { mdiDownloadBox } from "@mdi/js";
import { toast } from "react-toastify";

const SocieteList = () => {
  const [products, setProducts] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [company, setCompany] = useState(null);
  const [clients, setClients] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const { societeId } = useParams();

  // Fetch product data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllProducts(societeId);
        if (res.data) {
          // console.log(res.data.products);
          setProducts(res.data.products);
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
          setEmployees(res.data.employees);
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
          console.log(res.data);
          setCompany(res.data.company);
          setLastUpdated(res.data.company.updatedAt);
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
        console.log("res.data.clients ", res.data.clients);
        if (res.data.clients) {
          setClients(res.data.clients);
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
    }
    fetchData();
  }, [societeId]);

  // Get One Materials by ID
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllMaterials(societeId);
        console.log(res.data.materials);
        if (res.data.materials) {
          setMaterials(res.data.materials);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [societeId]);

  // Calculate the time elapsed since the last update
  const lastUpdate = new Date(lastUpdated);

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
                  Last updated {lastUpdate.toLocaleString()}
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
                clients
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
            {/* products */}
            <div
              class="tab-pane fade"
              id="produit"
              role="tabpanel"
              aria-labelledby="produit-tab"
            >
              <div className="card">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>The number of products is {products?.length}</div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link
                        to={`/societe/${societeId}/products/`}
                        className="btn btn-light btn-icon"
                      >
                        <Icon path={mdiPlusBox} size={1} />
                      </Link>
                      <Link to={`/`} className="btn btn-light btn-icon">
                        <Icon path={mdiDownloadBox} size={1} />
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
                    </thead>
                    <tbody>
                      {products?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              to={`products/${item._id}`}
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

            {/* employees */}
            <div
              class="tab-pane fade show active"
              id="employee"
              role="tabpanel"
              aria-labelledby="employee-tab"
            >
              <div className="card">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>The number of employees is {employees?.length}</div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link
                        to={`/societe/${societeId}/employees/`}
                        className="btn btn-light btn-icon"
                      >
                        <Icon path={mdiPlusBox} size={1} />
                      </Link>
                      <Link to={`/`} className="btn btn-light btn-icon">
                        <Icon path={mdiDownloadBox} size={1} />
                      </Link>
                    </div>
                  </div>
                </div>
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
                              to={`employees/${item._id}`}
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

            {/* clients */}
            <div
              class="tab-pane fade"
              id="client"
              role="tabpanel"
              aria-labelledby="client-tab"
            >
              <div className="card">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>The number of clients is {clients?.length}</div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link
                        to={`/societe/${societeId}/clients/`}
                        className="btn btn-light btn-icon"
                      >
                        <Icon path={mdiPlusBox} size={1} />
                      </Link>
                      <Link to={`/`} className="btn btn-light btn-icon">
                        <Icon path={mdiDownloadBox} size={1} />
                      </Link>
                    </div>
                  </div>
                </div>
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
                      {clients?.map((item, index) => (
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

            {/* materials */}
            <div
              class="tab-pane fade"
              id="material"
              role="tabpanel"
              aria-labelledby="material-tab"
            >
              <div className="card">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>The number of materials is {materials?.length}</div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link
                        to={`/societe/${societeId}/materials/`}
                        className="btn btn-light btn-icon"
                      >
                        <Icon path={mdiPlusBox} size={1} />
                      </Link>
                      <Link to={`/`} className="btn btn-light btn-icon">
                        <Icon path={mdiDownloadBox} size={1} />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>Material name</td>
                        <td>travail par heure</td>
                        <td>Date</td>
                      </tr>
                    </thead>
                    <tbody>
                      {materials?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.material_name}</td>
                          <td>{item.Work_per_hour}</td>
                          <td>{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
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
