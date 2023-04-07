import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { updateCompany } from "../../api/index";
import { useStateContext } from "../../context/ContextProvider";

const SocieteEdit = ({ value, societeId }) => {
  const [newEditVal, setNewEditVal] = useState({
    company_name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  });

  const { company_name, description, address, phone, email } = newEditVal;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
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
        company_name: value.company_name,
        description: value.description,
        address: value.address,
        phone: value.phone,
        email: value.email,
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
      const response = await updateCompany(societeId, token, newEditVal);
      if (response.status === 201) {
        setSuccess(true);
        console.log("societe updated successfully!");
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      console.log(err.response);
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
