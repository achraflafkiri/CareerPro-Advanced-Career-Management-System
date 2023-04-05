import React, { useEffect, useState } from "react";
import ProductCreate from "./ProductCreate";
import { Link, useParams } from "react-router-dom";
import { getAllProducts } from "../../api";

const ProductsList = () => {
  const [dataList, setDataList] = useState(null);

  const { productId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllProducts();
      setDataList(res.data.data.Products);
      console.log(dataList);
    }
    fetchData();
  }, []);

  return (
    <>
      <ProductCreate />

      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Liste des produits</h3>
            <div className="d-flex align-items-center justify-content-between mx-2">
              <button
                type="button"
                className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0 mx-1"
                data-bs-toggle="modal"
                data-bs-target="#addProduct"
              >
                <i className="mdi mdi-plus text-muted"></i>
              </button>
              <Link
                to={`/product/${productId}`}
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
              <th>Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th></th>
              <th></th>
              <th></th>
            </thead>
            {dataList?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/product/${item._id}`}
                    className="text-primary nav-link"
                  >
                    {item.product_name}
                  </Link>
                </td>
                <td>{item.quantity}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    type="submit"
                    class="btn btn-sm btn-primary text-white mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#EditModal"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <Link
                    type="button"
                    class="btn btn-sm btn-success text-white mb-3"
                    to={`/product/${item.id}`}
                  >
                    Détails
                  </Link>
                </td>
                <td>
                  <button
                    type="submit"
                    class="btn btn-sm btn-danger text-white mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#DeleteModal"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}{" "}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
