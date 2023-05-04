import React, { useState, useEffect } from "react";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import BarChart from "../../components/Charts/BarChart";
import { getAllCompanies } from "../../api/functions/companies";
import moment from "moment";
import "./style.css";

const DashboardAppPage = () => {
  const [companies, setCompanies] = useState(null);
  const [company, setCompany] = useState(null);

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

  const handleSelect = (e) => {
    const selectedCompany = companies.find(
      (company) => company.company_name === e.target.value
    );
    setCompany(selectedCompany);
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

      <div className="page-header">
        <h3 className="page-title">
          {/* <span className="page-title-icon bg-gradient-primary text-white me-2"></span> */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 700 700"
            className="page-title-icon bg-gradient-primary text-white me-2"
            aria-current="page"
          >
            <path
              fill="#fff"
              d="m280 525h-52.5c-28.875 0-52.5-23.625-52.5-52.5v-192.5h-37.625c-15.051 0-28-9.1016-33.074-23.449-4.8984-14.176-0.52344-29.398 11.199-38.852l223.65-178.85c6.3008-5.0742 15.398-5.0742 21.699 0l59.148 47.25v-16.102c0-19.25 15.75-35 35-35h35c19.25 0 35 15.75 35 35v100.1l59.5 47.602c11.727 9.4492 16.102 24.676 11.199 38.852-5.0742 14.176-18.023 23.449-33.074 23.449h-37.625v192.5c0 28.875-23.625 52.5-52.5 52.5h-52.5v-17.5-87.5c0-28.875-23.625-52.5-52.5-52.5h-35c-28.875 0-52.5 23.625-52.5 52.5v105zm87.5-122.5h-35c-9.625 0-17.5 7.875-17.5 17.5v105h70v-105c0-9.625-7.875-17.5-17.5-17.5z"
            />
          </svg>
          Dashboard
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li>
              <span></span>Overview{" "}
              {/* <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i> */}
            </li>
          </ul>
        </nav>
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
        {/* <div className="col-md-5 grid-margin stretch-card">
          <div className="card">
            <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div className=""></div>
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div className=""></div>
              </div>
            </div>
            <div className="card-body">
              <p className="card-title">Please select a company</p>
              <h1></h1>
              <h4></h4>
              <p className="text-muted"></p>
              <div id="total-sales-chart-legend">
                <label for="company"></label>
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
        </div> */}
      </div>

      <div className="row">
        <div className="col-md-16 grid-margin stretch-card">
          <div className="card">
            <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div className=""></div>
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div className=""></div>
              </div>
            </div>
            <div className="card-body">
              <p className="card-title">Please select a company</p>
              <h1></h1>
              <h4></h4>
              <p className="text-muted"></p>
              <div id="total-sales-chart-legend"></div>
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
