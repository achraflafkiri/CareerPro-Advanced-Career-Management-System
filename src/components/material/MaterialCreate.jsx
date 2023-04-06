import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createNewMaterial } from "../../api";
import { useStateContext } from "../../context/ContextProvider";

const MaterialCreate = () => {
  const [formData, setFormData] = useState({
    material_name: "",
    Work_per_hour: "",
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
    console.log("cliked");
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNewMaterial(token, formData, societeId);
      if (response.status === 201) {
        console.log("create client successfully!");
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      console.log(err.response);
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
              <select
                className="form-control"
                name="material_name"
                id="material_name"
                value={formData.material_name}
                onChange={handleChange}
              >
                <option value="">Select a material</option>
                <option value="Material A">Material A</option>
                <option value="Material B">Material B</option>
                <option value="Material C">Material C</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Work_per_hour">Work_per_hour</label>
              <input
                type="text"
                className="form-control"
                name="Work_per_hour"
                id="Work_per_hour"
                placeholder="Work_per_hour"
                value={formData.Work_per_hour}
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
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaterialCreate;
