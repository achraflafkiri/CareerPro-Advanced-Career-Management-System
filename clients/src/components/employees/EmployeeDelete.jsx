import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { deleteEmployee } from "../../api/functions/employees";

const EmployeeDelete = ({ value, societeId, employeeId, fetchData }) => {
  console.log(employeeId);
  const { token } = useStateContext();
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await deleteEmployee(token, societeId, employeeId);
      if (response.status === 204) {
        fetchData();
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      fetchData();
      console.error(err.response.data.message);
    }
  };

  return (
    <div
      className="modal fade"
      id="DeleteModal"
      tabindex="-1"
      aria-labelledby="DeleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="DeleteModalLabel">
              Delete Employee {value?.Employee_name}
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form action="/societe" method="POST">
            <div className="modal-body">
              <div className="modal-title">
                Are you sure you want to delete this Employee
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light text-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDelete;
