import React from "react";

const Banner = () => {
  return (
    <div className="row p-0 m-0 proBanner" id="proBanner">
      <div className="col-md-12 p-0 m-0">
        <div className="card-body card-body-padding d-flex align-items-center justify-content-between">
          <div className="ps-lg-1">
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0 font-weight-medium me-3 buy-now-text">
                Free 24/7 customer support, updates, and more with this
                template!
              </p>
              <a
                href="https://www.bootstrapdash.com/product/majestic-admin-pro/?utm_source=organic&utm_medium=banner&utm_campaign=buynow_demo"
                target="_blank"
                className="btn me-2 buy-now-btn border-0"
              >
                Get Pro
              </a>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <a href="https://www.bootstrapdash.com/product/majestic-admin-pro/">
              <i className="mdi mdi-home me-3 text-white"></i>
            </a>
            <button id="bannerClose" className="btn border-0 p-0">
              <i className="mdi mdi-close text-white me-0"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
