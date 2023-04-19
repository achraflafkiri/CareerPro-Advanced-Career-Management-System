import React, { useState, useEffect } from "react";
import DoughnutChart from "../components/Charts/DoughnutChart";
import BarChart from "../components/Charts/BarChart";
import { getAllCompanies } from "../api/functions/companies";

const DashboardAppPage = () => {
  const [companies, setCompanies] = useState(null);
  const [company, setCompany] = useState(null);

  // Fetch companies data
  useEffect(() => {
    async function fetchData() {
      const res = await getAllCompanies();
      if (res.data) {
        setCompanies(res.data.data.companies);
      }
    }
    fetchData();
  }, []);

  // const handleChange = () => {

  // }

  const handleSelectCompany = (e) => {
    e.preventDefault();
    console.log("Hello");
    setCompany(company);
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
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div
                id="cash-deposits-chart-legend"
                className="d-flex justify-content-center align-items-center pt-3"
              >
                <BarChart />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                <div className="form-group">
                  <label for="company">company</label>
                  <select className="form-control" id="company" name="company">
                    {companies?.map((company) => (
                      <option value={company.company_name} key={company._id}>
                        {company.company_name}
                      </option>
                    ))}
                  </select>
                </div>
              </p>
              <div id="d-flex justify-content-center align-items-center pt-3">
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-title">Recent Purchases</p>
              <div className="table-responsive">
                <table id="recent-purchases-listing" className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status report</th>
                      <th>Office</th>
                      <th>Price</th>
                      <th>Date</th>
                      <th>Gross amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jeremy Ortega</td>
                      <td>Levelled up</td>
                      <td>Catalinaborough</td>
                      <td>$790</td>
                      <td>06 Jan 2018</td>
                      <td>$2274253</td>
                    </tr>
                    <tr>
                      <td>Alvin Fisher</td>
                      <td>Ui design completed</td>
                      <td>East Mayra</td>
                      <td>$23230</td>
                      <td>18 Jul 2018</td>
                      <td>$83127</td>
                    </tr>
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
