import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const Navbar = ({ handleNavToggle }) => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const { sidebarIconOnly, setSidebarIconOnly } = useStateContext();

  const handleToggle = () => {
    setIsLinkActive(!isLinkActive);
    handleNavToggle(isLinkActive); // isLinkActive is true
  };

  const handleShowIcons = () => {
    setSidebarIconOnly(!sidebarIconOnly);
    console.log(sidebarIconOnly);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("ACCESS_TOKEN");
  };

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <Link className="navbar-brand brand-logo" href="index.html"></Link>
          <a className="navbar-brand brand-logo-mini" href="index.html"></a>
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
            onClick={handleShowIcons}
          >
            <span className="mdi mdi-sort-variant"></span>
          </button>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <ul className="navbar-nav navbar-nav-right"></ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
          onClick={handleToggle}
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
