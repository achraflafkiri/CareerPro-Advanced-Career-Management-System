import React, { useState } from "react";
import { Link } from "react-router-dom";
import MaterialCreate from "./MaterialCreate";

const ProductsList = () => {
  const [dataList, setDataList] = useState([]);
  const [newId, setNewId] = useState(dataList.length + 1);

  const [formData, setFormData] = useState({
    material_name: "",
    Work_per_hour: "",
    date: "",
  });

  const { product_name, description, quantity, date } = formData;


// getAllMaterials

  const { token } = useStateContext();
  //  get the id of societe
  const { societeId } = useParams();
  console.log("societeId => ", societeId);

  const handleSubmit = async (event) => {
    console.log("cliked");
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await createNew(token, formData, societeId);
      if (response.status === 201) {
        console.log("create societe successfully!");
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleAddRow = () => {
    const newDate = new Date().toISOString().slice(0, 10);
    const newRow = { id: newId, nom: "", heure: "", date: newDate };
    setNewId(newId + 1);
    setDataList([...dataList, newRow]);
  };

  const handleEdit = (index, field, value) => {
    const newDataList = [...dataList];
    newDataList[index][field] = value;
    setDataList(newDataList);
  };

  const handleDelete = (index) => {
    const newDataList = [...dataList];
    newDataList.splice(index, 1);
    setDataList(newDataList);
  };

  return (
    <>
          <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-3">
                  <h3>Liste des matériels</h3>
                  <p class="mb-md-0">Societe X.</p>
                </div>

                <div className="d-flex align-items-center justify-content-between mx-2">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm float-end text-white mx-1"
                  >
                    SAVE
                  </button>
                  <button
                    type="button"
                    className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0 mx-1"
                    onClick={handleAddRow}
                  >
                    <i className="mdi mdi-plus text-muted"></i>
                  </button>
                  <Link
                    to="/societe/"
                    className="btn btn-primary btn-sm float-end text-white mx-1"
                  >
                    BACK
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Materiels</th>
                    <th>Travail par heure</th>
                    <th>date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>
                        <select
                          name="materiels"
                          id="materiels"
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Ouvrir ce menu de sélection</option>
                          <option value="jcb">jcb</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={item.heure}
                          onChange={(e) =>
                            handleEdit(index, "heure", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          value={item.date}
                          onChange={(e) =>
                            handleEdit(index, "date", e.target.value)
                          }
                        />
                      </td>
                      <td className="d-flex">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger text-white"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary text-white ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#EditModal"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
