import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllMaterials, getOneMaterial } from "../../api/functions/materials";
import DeleteModal from "./MaterialDelete";
import EditModal from "./MaterialEdit";
import Icon from "@mdi/react";
import { mdiPencil, mdiDeleteEmptyOutline, mdiPlus } from "@mdi/js";
import { toast } from "react-toastify";

const MaterialList = () => {
  const navigate = useNavigate();
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
  }, [societeId]);

  const handleGetData = async (event, materialId) => {
    event.preventDefault();
    try {
      const response = await getOneMaterial(societeId, materialId);

      if (response.data) {
        setEditForm(response.data.material);
        setdeleteForm(response.data.material);
        setmaterialId(response.data.material._id);
      }
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const fetchData = async () => {
    const res = await getAllMaterials(societeId);
    setDataList(res.data.materials);
  };

  return (
    <>
      <EditModal
        value={deleteForm}
        societeId={societeId}
        materialId={materialId}
        fetchData={fetchData}
      />

      <DeleteModal
        value={deleteForm}
        societeId={societeId}
        materialId={materialId}
        fetchData={fetchData}
      />

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div class="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-3">
                  <h3>Liste des Materials</h3>
                  <p class="mb-md-0">Societe X.</p>
                </div>

                <div>
                  <button
                    onClick={() =>
                      navigate(`/societe/${societeId}/Materials/create`)
                    }
                    className="btn btn-light btn-icon btn-fw mx-1"
                  >
                    <Icon path={mdiPlus} size={1} />
                  </button>
                  <button
                    onClick={() => navigate(`/societe/${societeId}`)}
                    className="btn btn-inverse-primary btn-fw"
                  >
                    BACK
                  </button>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-center align-middle">Materials name</th>
                    <th className="text-center align-middle">Work per hour</th>
                    <th className="text-center align-middle">date</th>
                    <th className="text-center align-middle"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle">
                        {item.material_name}
                      </td>
                      <td className="text-center align-middle">
                        {item.work_per_hour}
                      </td>
                      <td className="text-center align-middle">{item.date}</td>
                      <td className="text-center align-middle">
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
    </>
  );
};

export default MaterialList;

// ;
