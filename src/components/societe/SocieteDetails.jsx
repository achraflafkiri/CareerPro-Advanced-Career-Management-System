import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SocieteList = () => {
  const [products, setProducts] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [company, setCompany] = useState(null);
  const [clients, setClients] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const navigate = useNavigate();

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

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const daysDiff = Math.floor(diff / 86400000); // 1 day = 86400000 ms

    if (daysDiff === 0) {
      return "Today";
    } else if (daysDiff === 1) {
      return "Yesterday";
    } else if (daysDiff < 365) {
      return `Last ${daysDiff} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Usage
  const formattedDate = formatDate(new Date(lastUpdated));

  // PDF LIST EMPLOYEES
  const employeesPdf = (e) => {
    e.preventDefault();
    const documentDefinition = {
      content: [
        {
          text: "List of Employees",
          style: "header",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: [
              ["First name", "Last name", "CNI", "Phone"],
              ...employees.map((employee) => [
                employee.employee_fname,
                employee.employee_lname,
                employee.cni,
                employee.phone,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download("employee-list.pdf");
  };

  // PDF LIST PRODUCTS
  const productsPdf = (e) => {
    e.preventDefault();

    const documentDefinition = {
      content: [
        {
          text: "List of Products",
          style: "header",
          margin: [0, 0, 0, 20], // add margin at the bottom to separate from the table
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: [
              ["Product Name", "Quantity", "Date", "Livraisons"],
              ...products.map((product) => [
                product.product_name,
                product.quantity,
                product.date,
                product.livraisons.length,
              ]),
            ],
            alignment: "center", // add alignment property to center the table
            layout: {
              fillColor: function (i, node) {
                // add alternating row background color
                return i % 2 === 0 ? "#F0F0F0" : null;
              },
            },
            style: "tableStyle",
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          marginBottom: 10, // add margin at the bottom
        },
        tableStyle: {
          fontSize: 11,
          margin: [0, 10, 0, 10], // add margin to top and bottom to separate from header and footer
        },
      },
      pageMargins: [40, 60, 40, 60], // add margins to the page
    };

    pdfMake.createPdf(documentDefinition).download("product-list.pdf");
  };

  // PDF LIST CLIENTS
  const clientsPdf = (e) => {
    e.preventDefault();

    const documentDefinition = {
      content: [
        {
          text: "List of Clients",
          style: "header",
          margin: [0, 0, 0, 20], // add margin at the bottom to separate from the table
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: [
              ["Full name", "Matricule", "Volume", "Commandes"],
              ...clients.map((client) => [
                client.client_name,
                client.matricule,
                client.volume,
                client.commandes.length,
              ]),
            ],
            alignment: "center", // add alignment property to center the table
            layout: {
              fillColor: function (i, node) {
                // add alternating row background color
                return i % 2 === 0 ? "#F0F0F0" : null;
              },
            },
            style: "tableStyle",
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          marginBottom: 10, // add margin at the bottom
        },
        tableStyle: {
          fontSize: 11,
          margin: [0, 10, 0, 10], // add margin to top and bottom to separate from header and footer
        },
      },
      pageMargins: [40, 60, 40, 60], // add margins to the page
    };

    pdfMake.createPdf(documentDefinition).download("client-list.pdf");
  };

  // PDF LIST materials
  const materialsPdf = (e) => {
    e.preventDefault();

    const documentDefinition = {
      content: [
        {
          text: "List of Materials",
          style: "header",
          margin: [0, 0, 0, 20], // add margin at the bottom to separate from the table
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: [
              ["Full name", "Travail par heure", "Date"],
              ...materials.map((material) => [
                material.material_name,
                material.matricule,
                material.volume,
                material.commandes.length,
              ]),
            ],
            alignment: "center", // add alignment property to center the table
            layout: {
              fillColor: function (i, node) {
                // add alternating row background color
                return i % 2 === 0 ? "#F0F0F0" : null;
              },
            },
            style: "tableStyle",
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          marginBottom: 10, // add margin at the bottom
        },
        tableStyle: {
          fontSize: 11,
          margin: [0, 10, 0, 10], // add margin to top and bottom to separate from header and footer
        },
      },
      pageMargins: [40, 60, 40, 60], // add margins to the page
    };

    pdfMake.createPdf(documentDefinition).download("material-list.pdf");
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body rounded">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2 className="card-title">
                    Details of Company{" "}
                    <span className="text-info">{company?.company_name}</span>
                  </h2>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated {formattedDate}
                    </small>
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      navigate(`/societe/`);
                    }}
                    className="btn btn-outline-primary btn-fw"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          {/* Links */}
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
                      <div className="button-container">
                        <button
                          onClick={() => {
                            navigate(`/societe/${societeId}/products/`);
                          }}
                          className="btn btn-inverse-primary btn-fw"
                        >
                          <span className="button-icon">
                            <Icon path={mdiPlusBox} size={1} />
                          </span>
                          <span className="button-text">Add products</span>
                        </button>
                        <button
                          className="btn btn-inverse-dark btn-fw mx-2"
                          onClick={productsPdf}
                        >
                          <span className="button-icon">
                            <Icon path={mdiDownloadBox} size={1} />
                          </span>
                          <span className="button-text">Download PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Date</th>
                      <th>Livraisons</th>
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
                          <td>{item.livraisons.length}</td>
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
                      <div className="button-container">
                        <button
                          onClick={() => {
                            navigate(`/societe/${societeId}/employees/`);
                          }}
                          className="btn btn-inverse-primary btn-fw"
                        >
                          <span className="button-icon">
                            <Icon path={mdiPlusBox} size={1} />
                          </span>
                          <span className="button-text">Add Employee</span>
                        </button>
                        <button
                          className="btn btn-inverse-dark btn-fw mx-2"
                          onClick={employeesPdf}
                        >
                          <span className="button-icon">
                            <Icon path={mdiDownloadBox} size={1} />
                          </span>
                          <span className="button-text">Download PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-hover">
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
                      <div className="button-container">
                        <button
                          onClick={() => {
                            navigate(`/societe/${societeId}/clients/`);
                          }}
                          className="btn btn-inverse-primary btn-fw"
                        >
                          <span className="button-icon">
                            <Icon path={mdiPlusBox} size={1} />
                          </span>
                          <span className="button-text">Add Employee</span>
                        </button>
                        <button
                          className="btn btn-inverse-dark btn-fw mx-2"
                          onClick={clientsPdf}
                        >
                          <span className="button-icon">
                            <Icon path={mdiDownloadBox} size={1} />
                          </span>
                          <span className="button-text">Download PDF</span>
                        </button>
                      </div>
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
                        <td>Commandes</td>
                      </tr>
                    </thead>
                    <tbody>
                      {clients?.map((client, index) => (
                        <tr key={index}>
                          <td>{client.client_name}</td>
                          <td>{client.matricule}</td>
                          <td>{client.volume}</td>
                          <td>{client.commandes.length}</td>
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
                      <div className="button-container">
                        <button
                          onClick={() => {
                            navigate(`/societe/${societeId}/materials/`);
                          }}
                          className="btn btn-inverse-primary btn-fw"
                        >
                          <span className="button-icon">
                            <Icon path={mdiPlusBox} size={1} />
                          </span>
                          <span className="button-text">Add materials</span>
                        </button>
                        <button
                          className="btn btn-inverse-dark btn-fw mx-2"
                          onClick={materialsPdf}
                        >
                          <span className="button-icon">
                            <Icon path={mdiDownloadBox} size={1} />
                          </span>
                          <span className="button-text">Download PDF</span>
                        </button>
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
      </div>
    </>
  );
};

export default SocieteList;
