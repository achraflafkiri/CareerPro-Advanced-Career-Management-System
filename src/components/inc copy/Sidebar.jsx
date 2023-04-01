import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ isLinkActive, isID }) => {
  const [active, setActive] = useState();
  const [urlId, seturlId] = useState("");

  useEffect(() => {
    seturlId(isID);
  }, [isID]);

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
          <Link class="nav-link" >
            <Icon icon="solar:home-2-linear" />
            <span class="menu-title mx-3">Dashboard</span>
          </Link>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            data-bs-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <i class="mdi mdi-circle-outline menu-icon"></i>
            <span class="menu-title">Société</span>
            <i class="menu-arrow"></i>
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
        {urlId ? (
          <>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#ui-pro"
                aria-expanded="false"
                aria-controls="ui-pro"
              >
                <i className="mdi mdi-circle-outline menu-icon"></i>
                <span className="menu-title">Produits</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="ui-pro">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to={`societe/${urlId}/produits`}>
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
                href="#ui-clients"
                aria-expanded="false"
                aria-controls="ui-clients"
              >
                <i className="mdi mdi-circle-outline menu-icon"></i>
                <span className="menu-title">Clients</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="ui-clients">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`societe/${urlId}/clients/create`}
                    >
                      Ajouter une nouvelle employés
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={`societe/${urlId}/clients/`}>
                      List des employés
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
                <i className="mdi mdi-circle-outline menu-icon"></i>
                <span className="menu-title">Employees</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="ui-Employees">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`societe/${urlId}/employees/`}
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
                <i className="mdi mdi-circle-outline menu-icon"></i>
                <span className="menu-title">materials</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="ui-materials">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`societe/${urlId}/materials/`}
                    >
                      Gestion des matériaux
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
