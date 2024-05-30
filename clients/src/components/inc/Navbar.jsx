import React, { useState, useEffect, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import Icon from "@mdi/react";
import { getOneUser } from "../../api/functions/profile";
import { mdiLogout, mdiAccountCircleOutline } from "@mdi/js";
import styled from "styled-components";

const BACKEND_IMAGE = process.env.REACT_APP_BACKEND_IMAGE;

const Navbar = ({ handleNavToggle }) => {
  const navigate = useNavigate();
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

  const ProfileIcon = styled(Icon)`
    color: #58d8a3;
    font-size: 5px;
    margin-right: 0.5rem;
    vertical-align: middle;
  `;

  const LogoutIcon = styled(Icon)`
    color: #000;
    font-size: 5px;
    margin-right: 0.5rem;
    vertical-align: middle;
  `;

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
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
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
          onClick={handleShowIcons}
        >
          <svg
            width="30"
            height="30"
            version="1.1"
            viewBox="0 0 700 700"

          >
            <defs>
              <symbol id="v" overflow="visible">
                <path d="m18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z" />
              </symbol>
              <symbol id="d" overflow="visible">
                <path d="m13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z" />
              </symbol>
              <symbol id="b" overflow="visible">
                <path d="m17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z" />
              </symbol>
              <symbol id="j" overflow="visible">
                <path d="m9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z" />
              </symbol>
              <symbol id="a" overflow="visible">
                <path d="m7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z" />
              </symbol>
              <symbol id="i" overflow="visible">
                <path d="m12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z" />
              </symbol>
              <symbol id="h" overflow="visible">
                <path d="m10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z" />
              </symbol>
              <symbol id="g" overflow="visible">
                <path d="m0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z" />
              </symbol>
              <symbol id="f" overflow="visible">
                <path d="m10.047-11.359c1.1016 0 1.8945-0.20312 2.375-0.60938 0.47656-0.41406 0.71875-1.0938 0.71875-2.0312 0-0.92578-0.24219-1.5859-0.71875-1.9844-0.48047-0.40625-1.2734-0.60938-2.375-0.60938h-2.2188v5.2344zm-2.2188 3.6406v7.7188h-5.25v-20.406h8.0312c2.6875 0 4.6562 0.45312 5.9062 1.3594 1.2578 0.89844 1.8906 2.3203 1.8906 4.2656 0 1.3555-0.32812 2.4648-0.98438 3.3281-0.64844 0.86719-1.625 1.5-2.9375 1.9062 0.71875 0.16797 1.3594 0.54297 1.9219 1.125 0.57031 0.57422 1.1484 1.4492 1.7344 2.625l2.8594 5.7969h-5.6094l-2.4844-5.0781c-0.5-1.0195-1.0117-1.7109-1.5312-2.0781-0.51172-0.375-1.1953-0.5625-2.0469-0.5625z" />
              </symbol>
              <symbol id="c" overflow="visible">
                <path d="m9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z" />
              </symbol>
              <symbol id="e" overflow="visible">
                <path d="m17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z" />
              </symbol>
              <symbol id="u" overflow="visible">
                <path d="m2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z" />
              </symbol>
              <symbol id="t" overflow="visible">
                <path d="m2.5781-20.406h6.6875l4.6562 10.922 4.6719-10.922h6.6875v20.406h-4.9844v-14.938l-4.7031 11.016h-3.3281l-4.7031-11.016v14.938h-4.9844z" />
              </symbol>
              <symbol id="s" overflow="visible">
                <path d="m16.781-19.766v4.3125c-1.125-0.5-2.2266-0.875-3.2969-1.125-1.0625-0.25781-2.0703-0.39062-3.0156-0.39062-1.25 0-2.1797 0.17969-2.7812 0.53125-0.60547 0.34375-0.90625 0.88281-0.90625 1.6094 0 0.54297 0.20312 0.96875 0.60938 1.2812 0.40625 0.30469 1.1406 0.5625 2.2031 0.78125l2.25 0.45312c2.2695 0.44922 3.8789 1.1406 4.8281 2.0781 0.95703 0.92969 1.4375 2.2461 1.4375 3.9531 0 2.25-0.66797 3.9297-2 5.0312-1.3359 1.0938-3.3711 1.6406-6.1094 1.6406-1.3047 0-2.6055-0.125-3.9062-0.375-1.3047-0.23828-2.6055-0.59766-3.9062-1.0781v-4.4531c1.3008 0.69922 2.5625 1.2266 3.7812 1.5781 1.2188 0.34375 2.3906 0.51562 3.5156 0.51562 1.1562 0 2.0352-0.1875 2.6406-0.5625 0.61328-0.38281 0.92188-0.9375 0.92188-1.6562 0-0.63281-0.21094-1.125-0.625-1.4688-0.41797-0.34375-1.2461-0.65625-2.4844-0.9375l-2.0312-0.4375c-2.043-0.4375-3.5391-1.1328-4.4844-2.0938-0.9375-0.95703-1.4062-2.25-1.4062-3.875 0-2.0312 0.65625-3.5938 1.9688-4.6875s3.1953-1.6406 5.6562-1.6406c1.125 0 2.2734 0.085938 3.4531 0.25 1.1875 0.16797 2.4141 0.42188 3.6875 0.76562z" />
              </symbol>
              <symbol id="r" overflow="visible">
                <path d="m12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z" />
              </symbol>
              <symbol id="q" overflow="visible">
                <path d="m16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z" />
              </symbol>
              <symbol id="p" overflow="visible">
                <path d="m2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z" />
              </symbol>
              <symbol id="o" overflow="visible">
                <path d="m2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z" />
              </symbol>
              <symbol id="n" overflow="visible">
                <path d="m17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z" />
              </symbol>
              <symbol id="m" overflow="visible">
                <path d="m2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z" />
              </symbol>
              <symbol id="l" overflow="visible">
                <path d="m2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z" />
              </symbol>
              <symbol id="k" overflow="visible">
                <path d="m14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z" />
              </symbol>
            </defs>
            <g>
              <path
                d="m560 299.6h-414.4c-9.5195 0-16.801-7.2812-16.801-16.801s7.2812-16.801 16.801-16.801h414.4c9.5195 0 16.801 7.2812 16.801 16.801s-7.2812 16.801-16.801 16.801zm0-140h-414.4c-9.5195 0-16.801-7.2812-16.801-16.801s7.2812-16.801 16.801-16.801h414.4c9.5195 0 16.801 7.2812 16.801 16.801s-7.2812 16.801-16.801 16.801zm-414.4 246.4h414.4c9.5195 0 16.801 7.2812 16.801 16.801s-7.2812 16.801-16.801 16.801h-414.4c-9.5195 0-16.801-7.2812-16.801-16.801s7.2773-16.801 16.801-16.801z"
                fill-rule="evenodd"
              />
            </g>
          </svg>
        </button>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <Link
              className="nav-link dropdown-toggle"
              id="profileDropdown"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="nav-profile-img">
                <img
                  src={image || `${BACKEND_IMAGE}/default.png`}
                  alt="user"
                />{" "}
                <span className="availability-status online"></span>
              </div>
              <div className="nav-profile-text">
                <p className="mb-1 text-black">{username}</p>
              </div>
              <span className="mx-3">
                <svg
                  width="15"
                  height="15"
                  version="1.1"
                  viewBox="0 0 700 700"
                >
                  <defs>
                    <symbol id="v" overflow="visible">
                      <path d="m14.656-0.875c-0.76172 0.39844-1.5547 0.69531-2.375 0.89062-0.8125 0.19531-1.6641 0.29688-2.5469 0.29688-2.6562 0-4.7617-0.73828-6.3125-2.2188-1.5547-1.4883-2.3281-3.5039-2.3281-6.0469 0-2.5508 0.77344-4.5664 2.3281-6.0469 1.5508-1.4883 3.6562-2.2344 6.3125-2.2344 0.88281 0 1.7344 0.10156 2.5469 0.29688 0.82031 0.19922 1.6133 0.49609 2.375 0.89062v3.2969c-0.76172-0.51953-1.5117-0.89844-2.25-1.1406-0.74219-0.23828-1.5234-0.35938-2.3438-0.35938-1.4688 0-2.625 0.46875-3.4688 1.4062-0.83594 0.9375-1.25 2.2344-1.25 3.8906 0 1.6484 0.41406 2.9375 1.25 3.875 0.84375 0.9375 2 1.4062 3.4688 1.4062 0.82031 0 1.6016-0.11719 2.3438-0.35938 0.73828-0.23828 1.4883-0.61719 2.25-1.1406z" />
                    </symbol>
                    <symbol id="b" overflow="visible">
                      <path d="m10.719-8.7031c-0.33594-0.15625-0.66797-0.26953-1-0.34375-0.32422-0.082031-0.65625-0.125-1-0.125-0.98047 0-1.7344 0.32031-2.2656 0.95312-0.53125 0.625-0.79688 1.5273-0.79688 2.7031v5.5156h-3.8125v-11.969h3.8125v1.9688c0.48828-0.78125 1.0508-1.3477 1.6875-1.7031 0.64453-0.36328 1.4102-0.54688 2.2969-0.54688 0.13281 0 0.27344 0.007812 0.42188 0.015625 0.14453 0.011719 0.36328 0.03125 0.65625 0.0625z" />
                    </symbol>
                    <symbol id="a" overflow="visible">
                      <path d="m13.781-6.0156v1.0938h-8.9375c0.09375 0.89844 0.41406 1.5703 0.96875 2.0156 0.55078 0.44922 1.3281 0.67188 2.3281 0.67188 0.80078 0 1.625-0.11719 2.4688-0.35938 0.84375-0.23828 1.7109-0.59766 2.6094-1.0781v2.9531c-0.90625 0.33594-1.8125 0.58984-2.7188 0.76562s-1.8125 0.26562-2.7188 0.26562c-2.1562 0-3.8398-0.54688-5.0469-1.6406-1.1992-1.1016-1.7969-2.6484-1.7969-4.6406 0-1.9453 0.58594-3.4766 1.7656-4.5938 1.1758-1.125 2.8008-1.6875 4.875-1.6875 1.875 0 3.375 0.57031 4.5 1.7031 1.1328 1.125 1.7031 2.6367 1.7031 4.5312zm-3.9375-1.2656c0-0.72656-0.21484-1.3125-0.64062-1.75-0.41797-0.44531-0.96875-0.67188-1.6562-0.67188-0.74219 0-1.3438 0.21094-1.8125 0.625-0.46094 0.41797-0.74609 1.0156-0.85938 1.7969z" />
                    </symbol>
                    <symbol id="j" overflow="visible">
                      <path d="m7.2031-5.3906c-0.80469 0-1.4062 0.13672-1.8125 0.40625-0.39844 0.27344-0.59375 0.67188-0.59375 1.2031 0 0.48047 0.16016 0.85938 0.48438 1.1406 0.32031 0.27344 0.77344 0.40625 1.3594 0.40625 0.71875 0 1.3203-0.25391 1.8125-0.76562 0.48828-0.51953 0.73438-1.1719 0.73438-1.9531v-0.4375zm5.8438-1.4375v6.8281h-3.8594v-1.7656c-0.51172 0.71875-1.0898 1.2461-1.7344 1.5781-0.63672 0.33203-1.418 0.5-2.3438 0.5-1.2422 0-2.2461-0.35938-3.0156-1.0781-0.77344-0.72656-1.1562-1.6719-1.1562-2.8281 0-1.3945 0.47656-2.4219 1.4375-3.0781 0.96875-0.65625 2.4883-0.98438 4.5625-0.98438h2.25v-0.29688c0-0.60156-0.24219-1.0469-0.71875-1.3281-0.48047-0.28125-1.2266-0.42188-2.2344-0.42188-0.8125 0-1.5742 0.085937-2.2812 0.25-0.71094 0.15625-1.3672 0.40234-1.9688 0.73438v-2.9219c0.82031-0.19531 1.6445-0.34766 2.4688-0.45312 0.82031-0.10156 1.6484-0.15625 2.4844-0.15625 2.1562 0 3.7109 0.42969 4.6719 1.2812 0.95703 0.84375 1.4375 2.2266 1.4375 4.1406z" />
                    </symbol>
                    <symbol id="d" overflow="visible">
                      <path d="m6.0156-15.359v3.3906h3.9375v2.7344h-3.9375v5.0781c0 0.55469 0.10938 0.92969 0.32812 1.125 0.21875 0.19922 0.65625 0.29688 1.3125 0.29688h1.9688v2.7344h-3.2812c-1.5117 0-2.5859-0.3125-3.2188-0.9375-0.625-0.63281-0.9375-1.707-0.9375-3.2188v-5.0781h-1.9062v-2.7344h1.9062v-3.3906z" />
                    </symbol>
                    <symbol id="i" overflow="visible">
                      <path d="m9.9688-10.219v-6.4062h3.8594v16.625h-3.8594v-1.7344c-0.52344 0.71094-1.1016 1.2305-1.7344 1.5625-0.63672 0.32031-1.3711 0.48438-2.2031 0.48438-1.4688 0-2.6797-0.58203-3.625-1.75-0.94922-1.1758-1.4219-2.6875-1.4219-4.5312s0.47266-3.3477 1.4219-4.5156c0.94531-1.1758 2.1562-1.7656 3.625-1.7656 0.83203 0 1.5664 0.16797 2.2031 0.5 0.63281 0.32422 1.2109 0.83594 1.7344 1.5312zm-2.5156 7.75c0.82031 0 1.4453-0.29688 1.875-0.89062 0.42578-0.60156 0.64062-1.4727 0.64062-2.6094 0-1.1445-0.21484-2.0156-0.64062-2.6094-0.42969-0.59375-1.0547-0.89062-1.875-0.89062-0.8125 0-1.4336 0.29688-1.8594 0.89062-0.42969 0.59375-0.64062 1.4648-0.64062 2.6094 0 1.1367 0.21094 2.0078 0.64062 2.6094 0.42578 0.59375 1.0469 0.89062 1.8594 0.89062z" />
                    </symbol>
                    <symbol id="h" overflow="visible">
                      <path d="m8.2031-2.4688c0.82031 0 1.4453-0.29688 1.875-0.89062 0.42578-0.60156 0.64062-1.4727 0.64062-2.6094 0-1.1445-0.21484-2.0156-0.64062-2.6094-0.42969-0.59375-1.0547-0.89062-1.875-0.89062-0.82422 0-1.4531 0.30469-1.8906 0.90625-0.4375 0.59375-0.65625 1.4609-0.65625 2.5938 0 1.1367 0.21875 2.0078 0.65625 2.6094 0.4375 0.59375 1.0664 0.89062 1.8906 0.89062zm-2.5469-7.75c0.53125-0.69531 1.1133-1.207 1.75-1.5312 0.64453-0.33203 1.3828-0.5 2.2188-0.5 1.4688 0 2.6758 0.58984 3.625 1.7656 0.94531 1.168 1.4219 2.6719 1.4219 4.5156s-0.47656 3.3555-1.4219 4.5312c-0.94922 1.168-2.1562 1.75-3.625 1.75-0.83594 0-1.5742-0.16797-2.2188-0.5-0.63672-0.33203-1.2188-0.84766-1.75-1.5469v1.7344h-3.8125v-16.625h3.8125z" />
                    </symbol>
                    <symbol id="f" overflow="visible">
                      <path d="m0.26562-11.969h3.8281l3.2188 8.125 2.7344-8.125h3.8125l-5.0312 13.094c-0.5 1.332-1.0898 2.2656-1.7656 2.7969-0.66797 0.53125-1.5547 0.79688-2.6562 0.79688h-2.2188v-2.5h1.2031c0.64453 0 1.1133-0.10547 1.4062-0.3125 0.30078-0.21094 0.53125-0.57812 0.6875-1.1094l0.10938-0.34375z" />
                    </symbol>
                    <symbol id="g" overflow="visible">
                      <path d="m9.2969-13.25c-1.2617 0-2.2344 0.46484-2.9219 1.3906-0.6875 0.91797-1.0312 2.2188-1.0312 3.9062 0 1.668 0.34375 2.9648 1.0312 3.8906 0.6875 0.92969 1.6602 1.3906 2.9219 1.3906 1.2578 0 2.2344-0.46094 2.9219-1.3906 0.6875-0.92578 1.0312-2.2227 1.0312-3.8906 0-1.6875-0.34375-2.9883-1.0312-3.9062-0.6875-0.92578-1.6641-1.3906-2.9219-1.3906zm0-2.9844c2.5625 0 4.5664 0.73438 6.0156 2.2031 1.457 1.4688 2.1875 3.4961 2.1875 6.0781 0 2.5742-0.73047 4.5938-2.1875 6.0625-1.4492 1.4688-3.4531 2.2031-6.0156 2.2031s-4.5742-0.73438-6.0312-2.2031c-1.4492-1.4688-2.1719-3.4883-2.1719-6.0625 0-2.582 0.72266-4.6094 2.1719-6.0781 1.457-1.4688 3.4688-2.2031 6.0312-2.2031zm-3.3594-4.0469h2.5v2.625h-2.5zm4.2188 0h2.5v2.625h-2.5z" />
                    </symbol>
                    <symbol id="e" overflow="visible">
                      <path d="m12.922-9.9688c0.48828-0.75 1.0625-1.3164 1.7188-1.7031 0.66406-0.38281 1.3984-0.57812 2.2031-0.57812 1.375 0 2.4219 0.42969 3.1406 1.2812 0.71875 0.84375 1.0781 2.0742 1.0781 3.6875v7.2812h-3.8438v-6.2344c0.007812-0.09375 0.015625-0.1875 0.015625-0.28125v-0.4375c0-0.84375-0.125-1.457-0.375-1.8438-0.25-0.38281-0.65234-0.57812-1.2031-0.57812-0.73047 0-1.293 0.30469-1.6875 0.90625-0.38672 0.59375-0.58984 1.4609-0.60938 2.5938v5.875h-3.8438v-6.2344c0-1.3203-0.11719-2.1758-0.34375-2.5625-0.23047-0.38281-0.63672-0.57812-1.2188-0.57812-0.73047 0-1.2969 0.30469-1.7031 0.90625-0.39844 0.60547-0.59375 1.4648-0.59375 2.5781v5.8906h-3.8438v-11.969h3.8438v1.75c0.46875-0.66406 1.0039-1.1719 1.6094-1.5156 0.61328-0.34375 1.2891-0.51562 2.0312-0.51562 0.82031 0 1.5508 0.19922 2.1875 0.59375 0.63281 0.39844 1.1133 0.96094 1.4375 1.6875z" />
                    </symbol>
                    <symbol id="u" overflow="visible">
                      <path d="m6.125-12.844v9.7344h1.4688c1.6758 0 2.957-0.41406 3.8438-1.25 0.89453-0.83203 1.3438-2.0391 1.3438-3.625 0-1.582-0.44531-2.7852-1.3281-3.6094-0.88672-0.83203-2.1719-1.25-3.8594-1.25zm-4.1094-3.1094h4.3281c2.4141 0 4.2188 0.17969 5.4062 0.53125 1.1875 0.34375 2.2031 0.92969 3.0469 1.75 0.75 0.71875 1.3047 1.5547 1.6719 2.5 0.36328 0.9375 0.54688 2 0.54688 3.1875 0 1.1992-0.18359 2.2734-0.54688 3.2188-0.36719 0.9375-0.92188 1.7656-1.6719 2.4844-0.85547 0.83594-1.8828 1.4219-3.0781 1.7656-1.1875 0.34375-2.9805 0.51562-5.375 0.51562h-4.3281z" />
                    </symbol>
                    <symbol id="t" overflow="visible">
                      <path d="m1.8438-11.969h3.8125v11.969h-3.8125zm0-4.6562h3.8125v3.125h-3.8125z" />
                    </symbol>
                    <symbol id="s" overflow="visible">
                      <path d="m11.188-11.594v2.9062c-0.82422-0.34375-1.6172-0.59766-2.375-0.76562-0.76172-0.16406-1.4805-0.25-2.1562-0.25-0.73047 0-1.2734 0.089844-1.625 0.26562-0.35547 0.17969-0.53125 0.46094-0.53125 0.84375 0 0.30469 0.13281 0.53906 0.40625 0.70312 0.26953 0.16797 0.75 0.28906 1.4375 0.35938l0.67188 0.09375c1.957 0.25 3.2734 0.66406 3.9531 1.2344 0.67578 0.57422 1.0156 1.4648 1.0156 2.6719 0 1.2812-0.46875 2.2461-1.4062 2.8906-0.9375 0.63672-2.3438 0.95312-4.2188 0.95312-0.78125 0-1.5938-0.0625-2.4375-0.1875s-1.7148-0.3125-2.6094-0.5625v-2.9062c0.75781 0.375 1.5391 0.65625 2.3438 0.84375 0.80078 0.17969 1.6133 0.26562 2.4375 0.26562 0.75 0 1.3125-0.10156 1.6875-0.3125 0.38281-0.20703 0.57812-0.50781 0.57812-0.90625 0-0.34375-0.13281-0.59766-0.39062-0.76562-0.26172-0.16406-0.78125-0.29688-1.5625-0.39062l-0.67188-0.09375c-1.6992-0.20703-2.8906-0.59766-3.5781-1.1719-0.6875-0.58203-1.0312-1.4609-1.0312-2.6406 0-1.2695 0.42969-2.207 1.2969-2.8125 0.875-0.61328 2.2109-0.92188 4.0156-0.92188 0.69531 0 1.4297 0.054688 2.2031 0.15625 0.78125 0.10547 1.6289 0.27344 2.5469 0.5z" />
                    </symbol>
                    <symbol id="c" overflow="visible">
                      <path d="m7.5312-9.5156c-0.84375 0-1.4922 0.30859-1.9375 0.92188-0.44922 0.60547-0.67188 1.4805-0.67188 2.625 0 1.1484 0.22266 2.0273 0.67188 2.6406 0.44531 0.60547 1.0938 0.90625 1.9375 0.90625 0.83203 0 1.4688-0.30078 1.9062-0.90625 0.44531-0.61328 0.67188-1.4922 0.67188-2.6406 0-1.1445-0.22656-2.0195-0.67188-2.625-0.4375-0.61328-1.0742-0.92188-1.9062-0.92188zm0-2.7344c2.0508 0 3.6562 0.55859 4.8125 1.6719 1.1641 1.1055 1.75 2.6406 1.75 4.6094s-0.58594 3.5117-1.75 4.625c-1.1562 1.1055-2.7617 1.6562-4.8125 1.6562-2.0625 0-3.6797-0.55078-4.8438-1.6562-1.168-1.1133-1.75-2.6562-1.75-4.625s0.58203-3.5039 1.75-4.6094c1.1641-1.1133 2.7812-1.6719 4.8438-1.6719z" />
                    </symbol>
                    <symbol id="r" overflow="visible">
                      <path d="m9.7031-16.625v2.5156h-2.1094c-0.54297 0-0.92188 0.10156-1.1406 0.29688-0.21094 0.19922-0.3125 0.53906-0.3125 1.0156v0.82812h3.2656v2.7344h-3.2656v9.2344h-3.8281v-9.2344h-1.8906v-2.7344h1.8906v-0.82812c0-1.3008 0.36328-2.2656 1.0938-2.8906 0.72656-0.625 1.8516-0.9375 3.375-0.9375z" />
                    </symbol>
                    <symbol id="q" overflow="visible">
                      <path d="m13.859-7.2812v7.2812h-3.8438v-5.5469c0-1.0508-0.027344-1.7695-0.078125-2.1562-0.042969-0.39453-0.12109-0.6875-0.23438-0.875-0.14844-0.25-0.35156-0.44141-0.60938-0.57812-0.25-0.14453-0.54297-0.21875-0.875-0.21875-0.79297 0-1.418 0.3125-1.875 0.9375-0.46094 0.61719-0.6875 1.4648-0.6875 2.5469v5.8906h-3.8125v-16.625h3.8125v6.4062c0.58203-0.69531 1.1953-1.207 1.8438-1.5312 0.64453-0.33203 1.3594-0.5 2.1406-0.5 1.3828 0 2.4297 0.42969 3.1406 1.2812 0.71875 0.84375 1.0781 2.0742 1.0781 3.6875z" />
                    </symbol>
                    <symbol id="p" overflow="visible">
                      <path d="m2.0156-15.953h4.5781l5.8125 10.938v-10.938h3.8906v15.953h-4.5938l-5.7969-10.938v10.938h-3.8906z" />
                    </symbol>
                    <symbol id="o" overflow="visible">
                      <path d="m1.7031-4.6562v-7.3125h3.8438v1.2031c0 0.64844-0.007813 1.4609-0.015625 2.4375v1.9688c0 0.96094 0.023438 1.6523 0.078125 2.0781 0.050781 0.41797 0.13281 0.72656 0.25 0.92188 0.15625 0.25 0.35938 0.44531 0.60938 0.57812 0.25781 0.13672 0.55078 0.20312 0.875 0.20312 0.80078 0 1.4258-0.30469 1.875-0.92188 0.45703-0.61328 0.6875-1.4688 0.6875-2.5625v-5.9062h3.8281v11.969h-3.8281v-1.7344c-0.57422 0.69922-1.1836 1.2148-1.8281 1.5469-0.64844 0.33203-1.3555 0.5-2.125 0.5-1.3867 0-2.4453-0.42188-3.1719-1.2656-0.71875-0.85156-1.0781-2.0859-1.0781-3.7031z" />
                    </symbol>
                    <symbol id="n" overflow="visible">
                      <path d="m13.859-7.2812v7.2812h-3.8438v-5.5781c0-1.0312-0.027344-1.7383-0.078125-2.125-0.042969-0.39453-0.12109-0.6875-0.23438-0.875-0.14844-0.25-0.35156-0.44141-0.60938-0.57812-0.25-0.14453-0.54297-0.21875-0.875-0.21875-0.79297 0-1.418 0.3125-1.875 0.9375-0.46094 0.61719-0.6875 1.4648-0.6875 2.5469v5.8906h-3.8125v-11.969h3.8125v1.75c0.58203-0.69531 1.1953-1.207 1.8438-1.5312 0.64453-0.33203 1.3594-0.5 2.1406-0.5 1.3828 0 2.4297 0.42969 3.1406 1.2812 0.71875 0.84375 1.0781 2.0742 1.0781 3.6875z" />
                    </symbol>
                    <symbol id="m" overflow="visible">
                      <path d="m2.0156-15.953h6.8125c2.0312 0 3.5859 0.45312 4.6719 1.3594 1.0938 0.89844 1.6406 2.1797 1.6406 3.8438 0 1.6797-0.54688 2.9688-1.6406 3.875-1.0859 0.89844-2.6406 1.3438-4.6719 1.3438h-2.7031v5.5312h-4.1094zm4.1094 2.9844v4.4531h2.2656c0.80078 0 1.4141-0.19141 1.8438-0.57812 0.4375-0.38281 0.65625-0.9375 0.65625-1.6562 0-0.70703-0.21875-1.2539-0.65625-1.6406-0.42969-0.38281-1.043-0.57812-1.8438-0.57812z" />
                    </symbol>
                    <symbol id="l" overflow="visible">
                      <path d="m1.8438-11.969h3.8125v11.75c0 1.6016-0.38672 2.8281-1.1562 3.6719-0.76172 0.84375-1.8711 1.2656-3.3281 1.2656h-1.8906v-2.5h0.65625c0.72656 0 1.2266-0.16797 1.5-0.5 0.26953-0.32422 0.40625-0.96875 0.40625-1.9375zm0-4.6562h3.8125v3.125h-3.8125z" />
                    </symbol>
                    <symbol id="k" overflow="visible">
                      <path d="m11.5-11.594v3.125c-0.52344-0.35156-1.043-0.61328-1.5625-0.78125-0.52344-0.17578-1.0625-0.26562-1.625-0.26562-1.0742 0-1.9062 0.3125-2.5 0.9375s-0.89062 1.4961-0.89062 2.6094c0 1.1172 0.29688 1.9844 0.89062 2.6094s1.4258 0.9375 2.5 0.9375c0.59375 0 1.1562-0.085937 1.6875-0.26562 0.53906-0.17578 1.0391-0.44141 1.5-0.79688v3.125c-0.59375 0.23047-1.1992 0.39453-1.8125 0.5-0.61719 0.11328-1.2344 0.17188-1.8594 0.17188-2.1562 0-3.8438-0.55078-5.0625-1.6562-1.2188-1.1133-1.8281-2.6562-1.8281-4.625s0.60938-3.5039 1.8281-4.6094c1.2188-1.1133 2.9062-1.6719 5.0625-1.6719 0.625 0 1.2383 0.058594 1.8438 0.17188 0.61328 0.10547 1.2227 0.26562 1.8281 0.48438z" />
                    </symbol>
                  </defs>
                  <path
                    transform="matrix(4.375,0,0,4.375,70,0)"
                    d="m64 86.5 45-45"
                    fill="none"
                    stroke="#b66dff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="14"
                  />
                  <path
                    transform="matrix(4.375,0,0,4.375,70,0)"
                    d="m64 86.5-45-45"
                    fill="none"
                    stroke="#b66dff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="14"
                  />
                </svg>
              </span>
            </Link>
            <div
              className="dropdown-menu navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <button
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                <ProfileIcon path={mdiAccountCircleOutline} size={1} />
                Profile
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>
                <LogoutIcon path={mdiLogout} size={1} /> Signout
              </button>
            </div>
          </li>
          <li className="nav-item d-none d-lg-block full-screen-link">
            <Link className="nav-link">
              <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
            </Link>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
          onClick={handleToggle}
        >
          <svg
            width="20pt"
            height="20pt"
            version="1.1"
            viewBox="0 0 700 700"
          >
            <g>
              <path d="m210 140h420v23.332h-420z" />
              <path d="m70 373.33h420v23.332h-420z" />
              <path d="m140 256.67h420v23.332h-420z" />
            </g>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
