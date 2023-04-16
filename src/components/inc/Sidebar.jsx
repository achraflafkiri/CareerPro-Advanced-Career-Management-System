import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Sidebar = ({ isLinkActive }) => {
  const [active, setActive] = useState();

  const [isSocieteId, setIsSocieteId] = useState(null);
  const { societeId } = useParams();

  useEffect(() => {
    setIsSocieteId(societeId);
  }, [societeId]);

  useEffect(() => {
    setActive(isLinkActive);
  }, [isLinkActive]);

  return (
    <nav
      className={`sidebar sidebar-offcanvas ${active ? "active" : ""}`}
      id="sidebar"
    >
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="mdi mdi-home menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <i className="mdi mdi-domain menu-icon"></i>
            <span className="menu-title">Société</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to={`/societe/`}>
                  List des société
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/societe/create`}>
                  Créer une nouvelle société
                </Link>
              </li>
            </ul>
          </div>
        </li>
        {isSocieteId ? (
          <>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#ui-pro"
                aria-expanded="false"
                aria-controls="ui-pro"
              >
                <i className="mdi mdi-chart-bar menu-icon"></i>
                <span className="menu-title">Products</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="ui-pro">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`societe/${isSocieteId}/products`}
                    >
                      Gestion des produits
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#ui-Employees"
                aria-expanded="false"
                aria-controls="ui-Employees"
              >
                <i className="mdi mdi-human-greeting menu-icon"></i>
                <span className="menu-title">Employees</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="ui-Employees">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`societe/${isSocieteId}/employees`}
                    >
                      Gestion des employés
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#ui-materials"
                aria-expanded="false"
                aria-controls="ui-materials"
              >
                <i className="mdi mdi-maxcdn menu-icon"></i>
                <span className="menu-title">materials</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="ui-materials">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`societe/${isSocieteId}/materials/`}
                    >
                      Gestion des matériaux
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#ui-client"
                aria-expanded="false"
                aria-controls="ui-client"
              >
                <i className="mdi mdi-truck-delivery menu-icon"></i>
                <span className="menu-title">clients</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="ui-client">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`societe/${isSocieteId}/clients`}
                    >
                      Gestion des clients
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
