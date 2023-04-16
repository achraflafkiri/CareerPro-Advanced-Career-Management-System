import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditModal from "./SocieteEdit";
import DeleteModal from "./SocieteDelete";
import { getAllCompanies, getOneCompany } from "../../api/functions/companies";
import Icon from "@mdi/react";
import {
  mdiPencil,
  mdiDeleteEmptyOutline,
  mdiEyeArrowRightOutline,
} from "@mdi/js";
import { toast } from "react-toastify";

const SocieteList = () => {
  const [dataList, setDataList] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [deleteForm, setdeleteForm] = useState(null);
  const [societeId, setSocieteId] = useState(null);

  // Fetch company data
  useEffect(() => {
    async function fetchData() {
      const res = await getAllCompanies();
      if (res.data) {
        setDataList(res.data.data.companies);
      }
    }
    fetchData();
  }, []);

  const handleGetData = async (event, societeId) => {
    event.preventDefault();
    setSocieteId(societeId);
    try {
      const response = await getOneCompany(societeId);
      if (response.data) {
        setEditForm(response.data.company);
        setdeleteForm(response.data.company);
        console.log("response.data.company => ", response.data.company);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    const res = await getAllCompanies(societeId);
    setDataList(res.data.data.companies);
    console.log(res.data.data.companies);
  };

  return (
    <>
      <EditModal value={editForm} societeId={societeId} fetchData={fetchData} />

      <DeleteModal
        value={deleteForm}
        societeId={societeId}
        fetchData={fetchData}
      />

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-item-center justify-content-between">
                <h3 className="card-title">Liste des sociétés</h3>
                <Link
                  to="/societe/create"
                  className="btn btn-primary btn-sm float-end text-white card-description"
                >
                  Ajouter une societé
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th className="text-center">Address</th>
                      <th className="text-center">Phone</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList?.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center align-middle">
                          <Icon path={mdiEyeArrowRightOutline} size={1} />
                          <Link
                            to={`/societe/${item._id}`}
                            className="text-primary nav-link "
                          >
                            {item.company_name}
                          </Link>
                        </td>
                        <td className="text-center align-middle">
                          {item.address}
                        </td>
                        <td className="text-center align-middle">
                          {item.phone}
                        </td>
                        <td className="text-center align-middle">
                          {item.email}
                        </td>
                        <td className="text-center align-middle">
                          <button
                            type="submit"
                            class="btn btn-sm btn-light btn-icon m-1"
                            data-bs-toggle="modal"
                            data-bs-target="#EditModal"
                            onClick={(e) => handleGetData(e, item._id)}
                          >
                            <Icon path={mdiPencil} size={1} />
                          </button>

                          <button
                            type="submit"
                            class="btn btn-sm btn-light btn-icon"
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteModal"
                            onClick={(e) => handleGetData(e, item._id)}
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
