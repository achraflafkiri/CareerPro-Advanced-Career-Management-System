import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import Icon from "@mdi/react";
import {
  mdiLogout,
  mdiPhoneSettingsOutline,
  mdiAccountSettingsOutline,
} from "@mdi/js";
import styled from "styled-components";

const Navbar = ({ handleNavToggle }) => {
  const navigate = useNavigate();
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
    localStorage.removeItem("USERIMAGE");
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
          <Link className="navbar-brand brand-logo" to={"/dashborad"}>
            Ktm ingenierie
          </Link>
          <Link className="navbar-brand brand-logo-mini" to={"/dashborad"}>
            Ktm ingenierie
          </Link>
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
          <li className="nav-item nav-profile dropdown">
            <Link
              className="nav-link dropdown-toggle "
              href="#"
              data-bs-toggle="dropdown"
              id="profileDropdown"
            >
              <img
                src={require(`../../assets/images/faces/${
                  userImage || "face27.jpg"
                }`)}
                alt="user_photo"
                className="rounded-circle img-thumbnail"
              />
              <span className="nav-profile-name">{userInfo?.username}</span>
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <Link className="dropdown-item" to={"/profile"}>
                <StyledIcon path={mdiAccountSettingsOutline} size={1} />
                Profile
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
