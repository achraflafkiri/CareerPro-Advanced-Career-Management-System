import React, { useState, useEffect } from "react";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import BarChart from "../../components/Charts/BarChart";
import { getAllCompanies } from "../../api/functions/companies";
import moment from "moment";
import "./style.css";
import Icon from "@mdi/react";
import { mdiZodiacScorpio, mdiDiamondStone, mdiChartArc } from "@mdi/js";
import { getAllGlobalLivraisons } from "../../api/functions/Livraisons";

const DashboardAppPage = () => {
  const [companies, setCompanies] = useState(null);
  const [company, setCompany] = useState(null);
  const [livraisons, setLivraison] = useState(null);

  // Fetch companies data
  useEffect(() => {
    async function fetchData() {
      const res = await getAllCompanies();
      if (res.status === 200) {
        setCompanies(res.data.companies);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllGlobalLivraisons();
      if (res.status === 200) {
        console.log(res.data);
        setLivraison(res.data.livraisons.length);
      }
    }
    fetchData();
  }, []);

  const handleSelect = (e) => {
    const selectedCompany = companies.find(
      (company) => company.company_name === e.target.value
    );
    setCompany(selectedCompany);
  };

  // Set the default company if the user has not selected any company
  useEffect(() => {
    if (companies && !company) {
      setCompany(companies[0]);
    }
  }, [companies, company]);

  // TODO LIST AREA
  const [items, setItems] = useState([]);

  const addItem = () => {
    // Get the input element
    const input = document.querySelector(".todo-list-input");

    // Add the new item to the list
    setItems([input.value, ...items]);

    // Clear the input field
    input.value = "";
  };

  const removeItem = (index) => {
    // Create a copy of the current items array
    const newItems = [...items];

    // Remove the item at the specified index
    newItems.splice(index, 1);

    // Update the state with the new items array
    setItems(newItems);
  };

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="me-md-3 me-xl-5">
                <h2>Welcome back,</h2>
                <p className="mb-md-0">Your analytics dashboard.</p>
              </div>
              <div className="d-flex">
                <i className="mdi mdi-home text-muted hover-cursor"></i>
                <p className="text-muted mb-0 hover-cursor">
                  &nbsp;/&nbsp;Dashboard&nbsp;/&nbsp;
                </p>
                <p className="text-primary mb-0 hover-cursor">Analytics</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-end flex-wrap">
              {/* btns place */}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div
          className="col-md-4 stretch-card grid-margin"
          style={{ overflow: "hidden" }}
        >
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <h4 className="font-weight-normal mb-3">
                Orders vs Delivery <Icon path={mdiChartArc} size={1} />
              </h4>
              <h6 className="card-text">Increased by 60%</h6>
              <div id="total-sales-chart-legend">
                <select
                  className="form-control"
                  id="company"
                  name="company"
                  onChange={handleSelect}
                >
                  {companies?.map((company) => (
                    <option value={company.company_name} key={company._id}>
                      {company.company_name}
                    </option>
                  ))}
                </select>
                {company && <DoughnutChart societeId={company._id} />}
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="col-md-4 stretch-card grid-margin"
          style={{ overflow: "hidden" }}
        >
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <svg
                version="1.1"
                id="Layer_1"
                className="card-img-absolute"
                x="0px"
                y="0px"
                viewBox="0 0 153 187"
              >
                <g>
                  <title>3</title>
                  <desc>Created with Sketch.</desc>
                  <g
                    id="Mask-_x2B_-Mask-Mask"
                    transform="translate(14.000000, 0.000000)"
                  >
                    <g id="Mask"></g>
                    <g id="Mask_1_">
                      <path
                        class="st0"
                        d="M138,141.2c-3.6,0.5-7.3,0.8-11,0.8c-29.6,0-55.4-16.5-68.6-40.9c-6-11-9.4-23.7-9.4-37.1
				c0-26.5,13.2-49.9,33.4-64H138v129.5"
                        fill="#ffffff47"
                      />
                    </g>
                    <g id="Mask_2_">
                      <path
                        class="st0"
                        d="M138,141.2V187H-15c0.2-43.3,31.9-79.1,73.4-85.9c4.6-0.8,9.3-1.1,14.1-1.1c26.1,0,49.5,11.4,65.5,29.5"
                        fill="#ffffff75"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <h4 className="font-weight-normal mb-3">
                Weekly Sales{" "}
                <Icon path={mdiChartBellCurveCumulative} size={1} />
              </h4>
              <h2 className="mb-5">$ 15,0000</h2>
              <h6 className="card-text">Increased by 60%</h6>
            </div>
          </div>
        </div> */}
        <div
          className="col-md-4 stretch-card grid-margin"
          style={{ overflow: "hidden" }}
        >
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <svg
                version="1.1"
                id="Layer_1"
                className="card-img-absolute"
                x="0px"
                y="0px"
                viewBox="0 0 153 187"
              >
                <g>
                  <title>3</title>
                  <desc>Created with Sketch.</desc>
                  <g
                    id="Mask-_x2B_-Mask-Mask"
                    transform="translate(14.000000, 0.000000)"
                  >
                    <g id="Mask"></g>
                    <g id="Mask_1_">
                      <path
                        class="st0"
                        d="M138,141.2c-3.6,0.5-7.3,0.8-11,0.8c-29.6,0-55.4-16.5-68.6-40.9c-6-11-9.4-23.7-9.4-37.1
				c0-26.5,13.2-49.9,33.4-64H138v129.5"
                        fill="#ffffff47"
                      />
                    </g>
                    <g id="Mask_2_">
                      <path
                        class="st0"
                        d="M138,141.2V187H-15c0.2-43.3,31.9-79.1,73.4-85.9c4.6-0.8,9.3-1.1,14.1-1.1c26.1,0,49.5,11.4,65.5,29.5"
                        fill="#ffffff75"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <h4 className="font-weight-normal mb-3">
                Weekly Orders <Icon path={mdiDiamondStone} size={1} />
              </h4>
              <h2 className="mb-5">{livraisons}</h2>
              <h6 className="card-text">Decreased by 10% </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-16 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="chartjs-size-monitor">
                <div className="chartjs-size-monitor-expand">
                  <div className=""></div>
                </div>
                <div className="chartjs-size-monitor-shrink">
                  <div className=""></div>
                </div>
              </div>
              <p className="card-title"></p>
              <p className="mb-4"></p>
              <BarChart />
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-7 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-white">Todo</h4>
            <div className="add-items d-flex">
              <input
                type="text"
                className="form-control todo-list-input"
                placeholder="What do you need to do today?"
              />
              <button
                className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn"
                id="add-task"
                onClick={addItem}
              >
                Add
              </button>
            </div>
            <div className="list-wrapper">
              <ul className="d-flex flex-column-reverse todo-list todo-list-custom">
                {items.map((item, index) => (
                  <li key={index}>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" /> {item}
                      </label>
                    </div>
                    <button
                      onClick={removeItem}
                      className="remove btn btn-light btn-icon"
                    >
                      <svg
                        width="30"
                        height="30"
                        className="remove"
                        version="1.1"
                        viewBox="0 0 700 700"
                      >
                        <g fill-rule="evenodd">
                          <path d="m350 64.168c-119.2 0-215.83 96.629-215.83 215.83 0 119.2 96.629 215.83 215.83 215.83 119.2 0 215.83-96.633 215.83-215.83 0-119.2-96.633-215.83-215.83-215.83zm-250.83 215.83c0-138.53 112.3-250.83 250.83-250.83s250.83 112.3 250.83 250.83-112.3 250.83-250.83 250.83-250.83-112.3-250.83-250.83z" />
                          <path d="m279.29 209.29c6.8359-6.8359 17.918-6.8359 24.75 0l45.957 45.957 45.961-45.957c6.8359-6.8359 17.914-6.8359 24.75 0 6.8359 6.832 6.8359 17.914 0 24.746l-45.961 45.961 45.957 45.957c6.8359 6.8359 6.8359 17.914 0 24.75-6.832 6.8359-17.91 6.8359-24.746 0l-45.961-45.961-45.957 45.961c-6.832 6.8359-17.914 6.8359-24.746 0-6.8359-6.8359-6.8359-17.914 0-24.75l45.957-45.957-45.961-45.961c-6.832-6.832-6.832-17.914 0-24.746z" />
                        </g>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-title">Recent Purchases</p>
              <div className="table-responsive">
                <table
                  id="recent-purchases-listing"
                  className="table dataTable no-footer"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>

                      <th>Email</th>
                      <th>Last update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.company_name}</td>
                        <td>{item.address}</td>

                        <td>{item.email}</td>

                        <td>{moment(item.updatedAt).fromNow()}</td>
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
  );
};

export default DashboardAppPage;
