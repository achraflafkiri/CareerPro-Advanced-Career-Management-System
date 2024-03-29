import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditModal from "./SocieteEdit";
import DeleteModal from "./SocieteDelete";
import { getAllCompanies, getOneCompany } from "../../api/functions/companies";
import Icon from "@mdi/react";
import {
  mdiPencil,
  mdiTrashCanOutline,
  mdiEyeArrowRightOutline,
  mdiReload,
  mdiPlus,
} from "@mdi/js";

const SocieteList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [deleteForm, setdeleteForm] = useState(null);
  const [societeId, setSocieteId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllCompanies();
      if (res.data) {
        setDataList(res.data.companies);
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
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await getAllCompanies(societeId);
      if (res.status === 200) {
        setDataList(res.data.companies);
        console.log("res.data.companies", res.data.companies);
      } else {
        setDataList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = (e) => {
    e.preventDefault();
    fetchData();
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
              <div className="d-flex align-item-center justify-content-between my-3">
                <h3 className="card-title">Liste des sociétés</h3>
                <div className="d-flex align-item-center justify-content-between">
                  <button
                    onClick={refresh}
                    className="btn btn-ref btn-icon mx-1"
                  >
                    <Icon path={mdiReload} size={1} />{" "}
                  </button>
                  <button
                    onClick={() => navigate(`/societe/create`)}
                    className="btn btn-add btn-icon mx-1"
                  >
                    <Icon path={mdiPlus} size={1} />
                  </button>
                </div>
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
                            className="btn btn-inverse-success btn-icon m-1"
                            data-bs-toggle="modal"
                            data-bs-target="#EditModal"
                            onClick={(e) => handleGetData(e, item._id)}
                          >
                            <Icon path={mdiPencil} size={1} />
                          </button>

                          <button
                            type="submit"
                            className="btn btn-inverse-danger btn-icon"
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteModal"
                            onClick={(e) => handleGetData(e, item._id)}
                          >
                            <Icon path={mdiTrashCanOutline} size={1} />
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
