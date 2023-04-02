import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { reset } from "../../store/middleware/auth/authSlice";

const Navbar = ({ handleNavToggle }) => {
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (isSuccess || user) {
      console.log("navbar", user);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleToggle = () => {
    setIsLinkActive(!isLinkActive);
    console.log("isLinkActive? => ", isLinkActive);
    handleNavToggle(isLinkActive); // isLinkActive is true
  };

  const handleLogout = (e) => {
    e.preventDefault();

    if (isSuccess || user) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.reload(true);
    }
  };

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <a className="navbar-brand brand-logo" href="index.html">
            {/* <img src="images/logo.svg" alt="logo"/> */}
          </a>
          <a className="navbar-brand brand-logo-mini" href="index.html">
            {/* <img src="images/logo-mini.svg" alt="logo"/> */}
          </a>
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="mdi mdi-sort-variant"></span>
          </button>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <h6>Vous travaillez pour la première entreprise</h6>
        <ul className="navbar-nav navbar-nav-right">
          {isAuth ? (
            <li className="nav-item nav-profile dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                id="profileDropdown"
              >
                <span className="nav-profile-name">achraf lafkiri</span>
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <Link className="dropdown-item">
                  <i className="mdi mdi-settings text-primary"></i>
                  Settings
                </Link>
                <Link to="/" onClick={handleLogout} className="dropdown-item">
                  <i className="mdi mdi-logout text-primary"></i>
                  Logout
                </Link>
              </div>
            </li>
          ) : (
            <Link className="btn btn-primary btn-sm text-white">Login</Link>
          )}
        </ul>
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
