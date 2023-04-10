import DoughnutChart from "../components/Charts/DoughnutChart";
import BarChart from "../components/Charts/BarChart";

const DashboardAppPage = () => {
  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="me-md-3 me-xl-5">
                <h2>Welcome back,</h2>
                <p className="mb-md-0">Your analytics dashboard template.</p>
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
              <button
                type="button"
                className="btn btn-light bg-white btn-icon me-3 d-none d-md-block "
              >
                <i className="mdi mdi-download text-muted"></i>
              </button>
              <button
                type="button"
                className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0"
              >
                <i className="mdi mdi-clock-outline text-muted"></i>
              </button>
              <button
                type="button"
                className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0"
              >
                <i className="mdi mdi-plus text-muted"></i>
              </button>
              <button className="btn btn-primary mt-2 mt-xl-0">
                Generate report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-title">companies and their products</p>
              <p className="mb-4">
                The columns represent different companies, while the vertical
                axis displays their respective products.
              </p>
              <div
                id="cash-deposits-chart-legend"
                className="d-flex justify-content-center pt-3"
              ></div>
              <BarChart />
            </div>
          </div>
        </div>
        <div className="col-md-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-title">Total sales</p>
              <h1>$ 28835</h1>
              <h4>Gross sales over the years</h4>
              <p className="text-muted">
                Today, many people rely on computers to do homework, work, and
                create or store useful information. Therefore, it is important{" "}
              </p>
              <div id="total-sales-chart-legend"></div>
            </div>
            <DoughnutChart />
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
                    <tr>
                      <td>Emily Cunningham</td>
                      <td>support</td>
                      <td>Makennaton</td>
                      <td>$939</td>
                      <td>16 Jul 2018</td>
                      <td>$29177</td>
                    </tr>
                    <tr>
                      <td>Minnie Farmer</td>
                      <td>support</td>
                      <td>Agustinaborough</td>
                      <td>$30</td>
                      <td>30 Apr 2018</td>
                      <td>$44617</td>
                    </tr>
                    <tr>
                      <td>Betty Hunt</td>
                      <td>Ui design not completed</td>
                      <td>Lake Sandrafort</td>
                      <td>$571</td>
                      <td>25 Jun 2018</td>
                      <td>$78952</td>
                    </tr>
                    <tr>
                      <td>Myrtie Lambert</td>
                      <td>Ui design completed</td>
                      <td>Cassinbury</td>
                      <td>$36</td>
                      <td>05 Nov 2018</td>
                      <td>$36422</td>
                    </tr>
                    <tr>
                      <td>Jacob Kennedy</td>
                      <td>New project</td>
                      <td>Cletaborough</td>
                      <td>$314</td>
                      <td>12 Jul 2018</td>
                      <td>$34167</td>
                    </tr>
                    <tr>
                      <td>Ernest Wade</td>
                      <td>Levelled up</td>
                      <td>West Fidelmouth</td>
                      <td>$484</td>
                      <td>08 Sep 2018</td>
                      <td>$50862</td>
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
