import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllMaterials, getOneMaterial } from "../../api/functions/materials";
import DeleteModal from "./MaterialDelete";
import EditModal from "./MaterialEdit";

import Icon from "@mdi/react";
import { mdiPencil, mdiDeleteEmptyOutline } from "@mdi/js";

const MaterialList = () => {
  const [dataList, setDataList] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [deleteForm, setdeleteForm] = useState(null);
  const [materialId, setmaterialId] = useState(null);

  const { societeId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllMaterials(societeId);
      setDataList(res.data.materials);
    }
    fetchData();
  }, []);

  const handleGetData = async (event, materialId) => {
    event.preventDefault();
    try {
      const response = await getOneMaterial(societeId, materialId);

      if (response.data) {
        setEditForm(response.data.material);
        setdeleteForm(response.data.material);
        setmaterialId(response.data.material._id);
        console.log("  materialId **** ", response.data.material);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <EditModal
        value={deleteForm}
        societeId={societeId}
        materialId={materialId}
      />

      <DeleteModal
        value={deleteForm}
        societeId={societeId}
        materialId={materialId}
      />

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-3">
                  <h3>Liste des Materials</h3>
                  <p class="mb-md-0">Societe X.</p>
                </div>

                <div className="d-flex align-items-center justify-content-between mx-2">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm float-end text-white mx-1"
                  >
                    SAVE
                  </button>
                  <Link
                    to={`/societe/${societeId}/Materials/create`}
                    className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0 mx-1"
                  >
                    <i className="mdi mdi-plus text-muted"></i>
                  </Link>
                  <Link
                    to="/societe/"
                    className="btn btn-primary btn-sm float-end text-white mx-1"
                  >
                    BACK
                  </Link>
                </div>
              </div>
            </div>

            <div class="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Materials name</th>
                    <th>Work per hour</th>
                    <th>date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.material_name}</td>
                      <td>{item.Work_per_hour}</td>
                      <td>{item.date}</td>
                      <td>
                        <button
                          class="btn btn-sm btn-light btn-icon m-1"
                          data-bs-toggle="modal"
                          data-bs-target="#EditModal"
                          onClick={(e) => handleGetData(e, item._id)}
                        >
                          <Icon path={mdiPencil} size={1} />
                        </button>
                        <button
                          type="submit"
                          class="btn btn-sm btn-light btn-icon "
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
    </>
  );
};

export default MaterialList;

// ;
