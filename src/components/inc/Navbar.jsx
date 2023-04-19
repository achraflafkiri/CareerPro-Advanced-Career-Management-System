import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";
import styled from "styled-components";

const Navbar = ({ handleNavToggle }) => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const { sidebarIconOnly, setSidebarIconOnly, user, image } =
    useStateContext();

  const [userInfo, setUserInfo] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const getUser = () => {
      const _userInfo = JSON.parse(localStorage.getItem("USER"));
      setUserInfo(_userInfo);
    };

    getUser();
  }, []); // pass an empty dependency array to run the effect only once

  useEffect(() => {
    const getUser = () => {
      const _userImage = JSON.parse(localStorage.getItem("USERIMAGE"));
      setUserImage(_userImage);
    };
    console.log("*****image**** ", image);

    getUser();
  }, []); // pass an empty dependency array to run the effect only once

  const handleToggle = () => {
    setIsLinkActive(!isLinkActive);
    handleNavToggle(isLinkActive); // isLinkActive is true
  };

  const handleShowIcons = () => {
    setSidebarIconOnly(!sidebarIconOnly);
    console.log(sidebarIconOnly);
    console.log(user);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.reload();
  };

  const StyledIcon = styled(Icon)`
    color: blue;
    font-size: 10px;
    margin-right: 0.5rem;
    vertical-align: middle;
  `;

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <a className="navbar-brand brand-logo" href="index.html">
            {/* <img src="../../assets/images/logo.svg" alt="logo" /> */}
            Ktm ingenierie
          </a>
          <a className="navbar-brand brand-logo-mini" href="index.html">
            {/* <img src="../../assets/images/logo-mini.svg" alt="logo" /> */}
            KTM
          </a>
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
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown me-1">
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="messageDropdown"
            >
              <p className="mb-0 font-weight-normal float-left dropdown-header">
                Messages
              </p>
              <Link className="dropdown-item">
                <div className="item-thumbnail">
                  {/* <img src="images/faces/face4.jpg" alt="image" className="profile-pic"> */}
                </div>
                <div className="item-content flex-grow">
                  <h6 className="ellipsis font-weight-normal">David Grey</h6>
                  <p className="font-weight-light small-text text-muted mb-0">
                    The meeting is cancelled
                  </p>
                </div>
              </Link>
              <Link className="dropdown-item">
                <div className="item-thumbnail">
                  {/* <img src="images/faces/face2.jpg" alt="image" className="profile-pic"> */}
                </div>
                <div className="item-content flex-grow">
                  <h6 className="ellipsis font-weight-normal">Tim Cook</h6>
                  <p className="font-weight-light small-text text-muted mb-0">
                    New product launch
                  </p>
                </div>
              </Link>
              <Link className="dropdown-item">
                <div className="item-thumbnail">
                  {/* <img src="images/faces/face3.jpg" alt="image" className="profile-pic" /> */}
                </div>
                <div className="item-content flex-grow">
                  <h6 className="ellipsis font-weight-normal"> Johnson</h6>
                  <p className="font-weight-light small-text text-muted mb-0">
                    Upcoming board meeting
                  </p>
                </div>
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown me-4">
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="notificationDropdown"
            >
              <p className="mb-0 font-weight-normal float-left dropdown-header">
                Notifications
              </p>
              <Link className="dropdown-item">
                <div className="item-thumbnail">
                  <div className="item-icon bg-success">
                    <i className="mdi mdi-information mx-0"></i>
                  </div>
                </div>
                <div className="item-content">
                  <h6 className="font-weight-normal">Application Error</h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Just now
                  </p>
                </div>
              </Link>
              <Link className="dropdown-item">
                <div className="item-thumbnail">
                  <div className="item-icon bg-warning">
                    <i className="mdi mdi-settings mx-0"></i>
                  </div>
                </div>
                <div className="item-content">
                  <h6 className="font-weight-normal">Settings</h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Private message
                  </p>
                </div>
              </Link>
              <Link className="dropdown-item">
                <div className="item-thumbnail">
                  <div className="item-icon bg-info">
                    <i className="mdi mdi-account-box mx-0"></i>
                  </div>
                </div>
                <div className="item-content">
                  <h6 className="font-weight-normal">New user registration</h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    2 days ago
                  </p>
                </div>
              </Link>
            </div>
          </li>
          <li className="nav-item nav-profile dropdown">
            <Link
              className="nav-link dropdown-toggle "
              href="#"
              data-bs-toggle="dropdown"
              id="profileDropdown"
            >
              {/* <figure style={{ width: "30px" }}> */}
              <img
                src={require(`../../assets/images/faces/${
                  userImage || "face27.jpg"
                }`)}
                alt="user_photo"
                className="rounded-circle img-thumbnail"
              />
              {/* </figure> */}
              <span className="nav-profile-name">{userInfo?.username}</span>
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <Link className="dropdown-item" to={"/profile"}>
                <i className="mdi mdi-settings text-primary"></i>
                Settings
              </Link>
              <button className="dropdown-item" onClick={handleLogout}>
                {/* <i className="mdi mdi-logout text-primary"></i> */}
                <StyledIcon path={mdiLogout} size={1} />
                Logout
              </button>
            </div>
          </li>
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
