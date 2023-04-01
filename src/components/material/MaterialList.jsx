import React, { useState } from "react";
import { Link } from "react-router-dom";
import MaterialForm from "./MaterialForm";

const ProductsList = () => {
  const [dataList, setDataList] = useState([]);
  const [newId, setNewId] = useState(dataList.length + 1);

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
        <div className="modal fade" id="EditModal" tabindex="-1" aria-labelledby="EditModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="EditModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <MaterialForm />
            </div>
            </div>
        
        </div>
        </div>

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
                            data-bs-toggle="modal" data-bs-target="#EditModal"
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
