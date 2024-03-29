import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/vendors/base/vendor.bundle.base.css";
import "./assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css";
import "./assets/vendors/css/vendor.bundle.base.css";
import "./assets/css/style.css";
import { ContextProvider } from "./context/ContextProvider.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ContextProvider>
      <App />
    </ContextProvider>
    <ToastContainer />
  </>
);
