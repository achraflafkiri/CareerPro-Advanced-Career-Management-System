import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createNewMaterial } from "../../api/functions/materials";
import { useStateContext } from "../../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MaterialCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    material_name: "",
    work_per_hour: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const { token } = useStateContext();
  //  get the id of societe
  const { societeId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNewMaterial(token, formData, societeId);
      if (response.status === 201) {
        navigate(`/societe/${societeId}/materials`);
        toast.info(`${response.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
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
    }
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Insert data about materials</h4>
          <p className="card-description"></p>
          <form
            className="forms-sample"
            onSubmit={handleSubmit}
            action={`/societe/${societeId}/materials/`}
          >
            <div className="form-group">
              <label htmlFor="material_name">Name</label>
              <input
                type="text"
                name="material_name"
                className="form-control"
                placeholder="Enter name of material"
                value={formData.material_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="work_per_hour">work_per_hour</label>
              <input
                type="text"
                className="form-control"
                name="work_per_hour"
                id="work_per_hour"
                placeholder="work per hour"
                value={formData.work_per_hour}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                id="date"
                placeholder="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary mx-2">
              Create
            </button>
            <Link
              to={`/societe/${societeId}/materials/`}
              className="btn btn-light text-dark"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaterialCreate;
