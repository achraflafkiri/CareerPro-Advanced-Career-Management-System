import React, { useState, useEffect } from "react";
import DoughnutChart from "../components/Charts/DoughnutChart";
import BarChart from "../components/Charts/BarChart";
import { getAllCompanies } from "../api/functions/companies";
import moment from "moment";

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

      <div className="row">
        <div className="col-md-7 ">
          <div className="card">
            <div className="card-body">
              <p className="card-title">
                staistics about companies and products
              </p>
              <p className="card-text">y: products</p>
              <p className="card-text">x: companies</p>
              <BarChart />
            </div>
          </div>
        </div>
        <div className="col-md-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                <div className="form-group">
                  <label for="company">company</label>
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
                </div>
              </p>
              <div id="d-flex justify-content-center align-items-center pt-3">
                {company && <DoughnutChart societeId={company._id} />}
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
