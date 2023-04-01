import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductsList = () => {
  const [dataList, setDataList] = useState([]);
  const [newId, setNewId] = useState(dataList.length + 1);

  const handleAddRow = () => {
    const newDate = new Date().toISOString().slice(0, 10);
    const newRow = { id: newId, nom: "", quantite: "", date: newDate };
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

    const { societeId } = useParams();


  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <div className="d-flex align-items-center justify-content-between">
              <h3>Liste des produits</h3>
              <div className="m-1">
                <span className="text-dark">Total: {dataList.length}</span>
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
                  <th>Nom</th>
                  <th>Vente</th>
                  <th>Quantité</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      <select
                        name="produits"
                        id="produits"
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Ouvrir ce menu de sélection</option>
                        <option value="GNF1">GNF1</option>
                        <option value="GNF2">GNF2</option>
                        <option value="GNT">GNT</option>
                        <option value="G0">G0</option>
                        <option value="G1">G1</option>
                        <option value="G2">G2</option>
                        <option value="SLC">SLC</option>
                        <option value="SLNC">SLNC</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="vente"
                        id="vente"
                        style={{ height: "30px", width: "30px" }}
                        cassName="form-check-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.quantite}
                        name="quantite"
                        id="quantite"
                        placeholder="0"
                        onChange={(e) =>
                          handleEdit(index, "quantite", e.target.value)
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
                      <Link
                        to={`/societe/${societeId}/produits/${item.id}/edit`}
                        className="btn btn-sm btn-primary text-white ms-2 mx-2"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/societe/${societeId}/produits/${item.id}/`}
                        className="btn btn-sm btn-info text-white ms-2 mx-2"
                      >
                        Details
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger text-white mx-2"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
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
  );
};

export default ProductsList;
