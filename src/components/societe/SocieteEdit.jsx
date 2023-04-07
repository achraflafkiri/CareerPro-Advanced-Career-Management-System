import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { updateCompany } from "../../api/index";
import { useStateContext } from "../../context/ContextProvider";

const SocieteEdit = ({ value }) => {
  const [formData, setFormData] = useState({
    company_name: value.company_name || "",
    description: value.description || "",
    address: value.address || "",
    phone: value.phone || "",
    email: value.email || "",
  });

  const { company_name, description, address, phone, email } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { token } = useStateContext();
  const handleSubmit = async (event) => {
    console.log(value);
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await updateCompany(societeId, token, formData);
      console.log("societe updated successfully! ", response);
      if (response.status === 201) {
        console.log("societe updated successfully!");
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      console.log(err);
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
              Edit Societe
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form action="/societe">
            <div class="modal-body">
              <div className="mb-3">
                <label htmlFor="company_name">Company name</label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  value={company_name}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  className="form-control"
                  rows="4"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={phone}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="btn btn-light text-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-info text-white"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SocieteEdit;
