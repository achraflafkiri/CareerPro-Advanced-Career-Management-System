import React from "react";

const EmployeesForm = () => {
  return (
        <form>
          <div className="mb-3">
            <label htmlFor="nom">Nom <span className="text-danger">*</span></label>
            <input type="text" name="nom" id="nom" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="prenom">prenom <span className="text-danger">*</span></label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              className="form-control"
              rows="4"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cni">CNI <span className="text-danger">*</span></label>
            <input type="text" name="cni" id="cni" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" id="phone" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="role">Role</label>
            <input type="text" name="role" id="role" className="form-control" />
          </div>
          <div className="mb-3">
           
            <button type="submit" className="btn btn-secondary text-white" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary text-white">SAVE</button>

          </div>
        </form>

  );
};

export default EmployeesForm;
