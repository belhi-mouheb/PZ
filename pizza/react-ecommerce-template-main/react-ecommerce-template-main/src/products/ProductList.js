import React, { useState, useEffect } from "react";
import Product from "./Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

function ProductList() {
  const [pizzas, setPizzas] = useState([]);
  const [viewType, setViewType] = useState({ grid: true });

  useEffect(() => {
    fetch("http://localhost:5000/api/list/pizzas")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPizzas(data);
      })
      .catch((error) => console.error("Erreur de récupération des pizzas :", error));
  }, []);

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <div className="row mb-4 mt-lg-3">
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col-lg-3 d-none d-lg-block">
                {/* Menu de filtre */}
              </div>
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search products..."
                    aria-label="search input"
                  />
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {pizzas.map((pizza, i) => {
                return (
                  <Product key={i} pizza={pizza} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
