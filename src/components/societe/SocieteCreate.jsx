import React, { useState } from "react";
import { createNewCompany } from "../../api/index";
import { Link, Navigate } from "react-router-dom";

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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("ACCESS_TOKEN");
  //     if (!token) {
  //       throw new Error("Token not found");
  //     }
  //     const response = await createNewCompany(token, formData);
  //     if (response.status === 201) {
  //       setSuccess(true); // set success to true on successful creation of company
  //       console.log("create societe successfully!");
  //     } else {
  //       throw new Error("failed");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setError(err.response?.data?.err?.message ?? err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("ACCESS_TOKEN");

    const headers = new Headers();
    headers.append(
      "Authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjlhM2IzNDk1NzczNGJkMmJhYTg1OCIsImlhdCI6MTY4MDQ2MzcxMywiZXhwIjoxNjgzMDU1NzEzfQ._I7IwNM_p44rVDAb_67XzQgh2PLw5YXGSpmNvHbePuk`
    );

    console.log(formData);
    fetch("http://localhost:3000/api/v1/company", {
      method: "POST",
      body: formData,
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.log("Error: ", error);
      });
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
                Créer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocieteCreate;
