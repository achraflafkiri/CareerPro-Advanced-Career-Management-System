import React, { useState } from "react";
import { createNewCompany } from "../../api/functions/companies";
import { useStateContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SocieteCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  });

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
        navigate("/societe");
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
    <div className="row">
      <div className="col-md-16">
        <div className="card">
          <div className="card-header">
            <h5>Créer une nouvelle société</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} method="POST" action="/societe">
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
                  className="form-control"
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone">
                  Téléphone <em className="text-danger">*</em>
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  Email <em className="text-danger">*</em>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <div className="row">
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "En cours..." : "Créer"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocieteCreate;
