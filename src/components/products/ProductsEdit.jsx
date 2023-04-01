import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductsEdit = () => {
  const [dataList, setDataList] = useState({
    produit: "",
    vente: "",
    quantite: "",
    date: "",
    societe: "",
    bon_de_livraison: "",
  });

  const handleEdit = (index, field, value) => {
    // update the dataList state based on the edited field and value
    setDataList(prevDataList => ({
      ...prevDataList,
      [field]: value
    }));
  }

  const {societeId} = useParams();

  return (
    <div className="row">
      <div className="col-md-16">
        <form action={`/societe/${societeId}/produits`}>
          <div className="card">
            <div className="card-header">
              <p className="text-dark">Modifier les données du produit</p>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <select
                  name="produit"
                  id="produit"
                  className="form-select" // fixed class attribute name
                  aria-label="Default select example"
                  value={dataList.produit} // set the select value based on state
                  onChange={(e) => handleEdit(0, "produit", e.target.value)}
                >
                  <option value="">Ouvrir ce menu de sélection</option>
                  <option value="GNF1">GNF1</option>
                  <option value="GNF2">GNF2</option>
                  <option value="GNT">GNT</option>
                  <option value="G0">G0</option>
                  <option value="G1">G1</option>
                  <option value="G2">G2</option>
                  <option value="SLC">SLC</option>
                  <option value="SLNC">SLNC</option>
                </select>
              </div>
              <div className="mb-3 d-flex align-items-center justify-content-start">
                <label htmlFor="vente">vente</label>
                <input
                  type="checkbox"
                  name="vente"
                  id="vente"
                  style={{ height: "30px", width: "30px" }}
                  className="form-check-input mx-3" // fixed class attribute name
                  checked={dataList.vente} // set the checkbox checked status based on state
                  onChange={(e) => handleEdit(0, "vente", e.target.checked)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={dataList.quantite}
                  name="quantite"
                  id="quantite"
                  placeholder="0"
                  onChange={(e) => handleEdit(0, "quantite", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={dataList.date}
                  name="date"
                  id="date"
                  placeholder="0"
                  onChange={(e) => handleEdit(0, "date", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <p className="text-dark">Modifier les informations du bon de livraison</p>
            </div>
            <div className="card-body">
              <div className="mb-3 d-flex align-items-center justify-content-start">
                <input
                  type="input"
                  name="societe"
                  placeholder="societe"
                  id="societe"
                  className="form-control"
                  value={dataList.societe}
                  onChange={(e) => handleEdit(0, "societe", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={dataList.bon_de_livraison}
                  name="bon_de_livraison"
                  id="bon_de_livraison"
                  placeholder="0"
                  onChange={(e) => handleEdit(0, "bon_de_livraison", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary text-white">send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsEdit;
