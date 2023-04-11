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
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Edit material
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="forms-sample">
              <div class="form-group">
                <label for="product_name">Product name</label>
                <input
                  type="text"
                  class="form-control"
                  name="product_name"
                  value={material_name}
                  id="product_name"
                  placeholder="product name"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label for="Work_per_hour">Work_per_hour</label>
                <input
                  type="text"
                  class="form-control"
                  name="Work_per_hour"
                  id="Work_per_hour"
                  value={Work_per_hour}
                  placeholder="Work_per_hour"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label for="date">Date</label>
                <input
                  type="date"
                  class="form-control"
                  name="date"
                  id="date"
                  value={date}
                  placeholder="date"
                  onChange={handleChange}
                />
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  {loading ? "Loading ... " : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialEdit;
