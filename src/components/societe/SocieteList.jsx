import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditModal from "./SocieteEdit";
import DeleteModal from "./SocieteDelete";
import { getAllCompanies } from "../../api";

import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";
import { mdiDeleteEmptyOutline } from "@mdi/js";
import { mdiEyeArrowRightOutline } from "@mdi/js";

const initialSocieteList = [];

const SocieteList = () => {
  const [dataList, setDataList] = useState(initialSocieteList);

  // Fetch company data
  useEffect(() => {
    async function fetchData() {
      const res = await getAllCompanies();
      console.log(res);
      if (res.data) {
        setDataList(res.data.data.companies);
        console.log(dataList);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <EditModal />

      <DeleteModal />

      <div className="row">
        <div className="col-lg-16 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Liste des sociétés
                <Link
                  to="/societe/create"
                  className="btn btn-primary btn-sm float-end text-white card-description"
                >
                  Ajouter une societé
                </Link>
              </h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList?.map((item, index) => (
                      <tr key={index}>
                        <td className="d-flex justify-content-center">
                          <Icon path={mdiEyeArrowRightOutline} size={1} />
                          <Link
                            to={`/societe/${item._id}`}
                            className="text-primary nav-link "
                          >
                            {item.company_name}
                          </Link>
                        </td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td className="d-flex align-items-center justify-content-center">
                          <button
                            type="submit"
                            class="btn btn-sm btn-light btn-icon m-1"
                            data-bs-toggle="modal"
                            data-bs-target="#EditModal"
                          >
                            <Icon path={mdiPencil} size={1} />
                          </button>

                          <button
                            type="submit"
                            class="btn btn-sm btn-light btn-icon "
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteModal"
                          >
                            <Icon path={mdiDeleteEmptyOutline} size={1} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocieteList;
