import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const SocieteCreate = () => {
  const formik = useFormik({
    initialValues: {
      nom: "",
      description: "",
      address: "",
      phone: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // submit the form
    },
  });

  return (
    <div className="row">
      <div className="col-md-16">
        <div className="card">
          <div className="card-header">
            <h5>Créer une nouvelle société</h5>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nom">
                  Nom de société <em className="text-danger">*</em>
                </label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={formik.values.nom}
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
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
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-info text-white mx-1">
                  Send
                </button>
                <Link to="/societe" className="btn btn-light text-dark mx-1">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default SocieteCreate;
