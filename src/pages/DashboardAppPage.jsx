
const DashboardAppPage = () => {
 

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
              <button className="btn btn-info mt-2 mt-xl-0 text-white">
                Gestion des carriers
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card card-rounded">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">Text</div>
      </div>
    </div>
  );
};

export default DashboardAppPage;
