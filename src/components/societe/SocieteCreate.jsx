import React, { useState } from "react";
import { createNewCompany } from "../../api/index";
import { useStateContext } from "../../context/ContextProvider";

import { toast } from "react-toastify";

const SocieteCreate = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { token } = useStateContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNewCompany(token, formData);
      if (response.status === 201) {
        setSuccess(true); // set success to true on successful creation of company
        console.log("create societe successfully!");
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-16">
        {success && (
          <div className="mt-3 alert alert-success">
            Société créée avec succès !
          </div>
        )}
        {error && <div className="mt-3 alert alert-danger">{error}</div>}
        <div className="card">
          <div className="card-header">
            <h5>Créer une nouvelle société</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} method="POST">
              <div className="mb-3">
                <label htmlFor="nom">
                  Nom de société <em className="text-danger">*</em>
                </label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.description}
                  rows="4"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="address">
                  Address <em className="text-danger">*</em>
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={handleChange}
                  value={formData.address}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  E-mail <em className="text-danger">*</em>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {loading ? "Loading..." : "Créer"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocieteCreate;
