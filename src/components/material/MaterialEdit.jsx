import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { updateMaterial } from "../../api/functions/materials";
import { useStateContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";

const MaterialEdit = ({ value, societeId, materialId, fetchData }) => {
  const [newEditVal, setNewEditVal] = useState({
    material_name: "",
    Work_per_hour: "",
    date: "",
  });

  const { material_name, Work_per_hour, date } = newEditVal;

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
        Work_per_hour: value.Work_per_hour,
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
        toast.success("Material updated successfully!", {
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
      class="modal fade"
      id="EditModal"
      tabindex="-1"
      aria-labelledby="EditModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="EditModalLabel">
              Edit Material
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            className="forms-sample"
            onSubmit={handleSubmit}
            action={`/societe/${societeId}/materials/`}
          >
            <div className="form-group">
              <label htmlFor="material_name">Name</label>
              <select
                className="form-control"
                name="material_name"
                id="material_name"
                value={material_name}
                onChange={handleChange}
              >
                <option value="">Select a material</option>
                <option value="Material A">Material A</option>
                <option value="Material B">Material B</option>
                <option value="Material C">Material C</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Work_per_hour">Work per hour</label>
              <input
                type="text"
                className="form-control"
                name="Work_per_hour"
                id="Work_per_hour"
                placeholder="Work_per_hour"
                value={Work_per_hour}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">date</label>
              <input
                type="text"
                className="form-control"
                name="date"
                id="date"
                placeholder="date"
                value={date}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {loading ? "loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaterialEdit;
