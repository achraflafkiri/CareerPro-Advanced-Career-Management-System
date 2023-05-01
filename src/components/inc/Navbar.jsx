import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import Icon from "@mdi/react";
import { getOneUser } from "../../api/functions/profile";
import { mdiLogout, mdiAccountCircleOutline } from "@mdi/js";
import styled from "styled-components";

const Navbar = ({ handleNavToggle }) => {
  const { sidebarIconOnly, setSidebarIconOnly, userId } = useStateContext();
  const [isLinkActive, setIsLinkActive] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    location: "",
    bio: "",
    image: null,
  });

  const { username, image } = userInfo;

  useEffect(() => {
    const getUser = async () => {
      const res = await getOneUser(userId);
      if (res.data) {
        setUserInfo({
          username: res.data.user.username,
          image: res.data.user.image,
        });
      }
    };

    getUser();
  }, [userId]);

  const handleToggle = () => {
    setIsLinkActive(!isLinkActive);
    handleNavToggle(isLinkActive);
  };

  const handleShowIcons = () => {
    setSidebarIconOnly(!sidebarIconOnly);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("ACCESS_ID");
    window.location.reload();
  };

  const StyledIcon = styled(Icon)`
    color: #000;
    font-size: 5px;
    margin-right: 0.5rem;
    vertical-align: middle;
  `;

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <Link className="navbar-brand brand-logo" to={"/dashboard"}>
            <figure style={{ width: "100px" }}>
              {/* <img src={logo} alt="logo" style={{ width: "100%" }} /> */}
            </figure>
          </Link>
          <Link className="navbar-brand brand-logo-mini" to={"/dashboard"}>
            <figure style={{ width: "100px" }}>
              {/* <img src={logo} alt="logo" style={{ width: "100%" }} /> */}
            </figure>
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
                src={image || "http://localhost:8080/profile/default.png"}
                alt="user_photo"
                className="rounded-circle img-thumbnail"
              />
              <span className="nav-profile-name">{username}</span>
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <Link className="dropdown-item" to={"/profile"}>
                <StyledIcon path={mdiAccountCircleOutline} size={1} />
                Profile
              </Link>
              <button className="dropdown-item" onClick={handleLogout}>
                <StyledIcon path={mdiLogout} size={1} /> Logout
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
