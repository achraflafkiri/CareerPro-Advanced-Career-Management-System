import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { updateMaterial } from "../../api/functions/materials";
import { useStateContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";

const MaterialEdit = ({ value, societeId, materialId, fetchData }) => {
  const [newEditVal, setNewEditVal] = useState({
    material_name: "",
    work_per_hour: "",
    date: "",
  });

  const { material_name, work_per_hour, date } = newEditVal;

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEditVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (value) {
      setNewEditVal({
        material_name: value.material_name,
        work_per_hour: value.work_per_hour,
        date: value.date,
      });
    }
  }, [value]);

  const { token } = useStateContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await updateMaterial(
        token,
        newEditVal,
        societeId,
        materialId
      );

      if (response.status === 200) {
        toast.success(`${response.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        fetchData();
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      toast.warn(`${err.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="modal fade"
      id="EditModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit material
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="material_name">Material name</label>
                <input
                  type="text"
                  className="form-control"
                  name="material_name"
                  value={material_name}
                  id="material_name"
                  placeholder="Material name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="work_per_hour">Work per hour</label>
                <input
                  type="text"
                  className="form-control"
                  name="work_per_hour"
                  value={work_per_hour}
                  id="work_per_hour"
                  placeholder="Work per hour"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={date}
                  id="date"
                  placeholder="Date"
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={
                    !material_name || !work_per_hour || !date || loading
                  }
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Update material"
                  )}
                </button>
                <Link
                  to={`/societe/${societeId}`}
                  className="btn btn-light text-dark"
                  data-bs-dismiss="modal"
                >
                  Close
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialEdit;
