import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductH({ pizza }) {
  const { name, price, image, description } = pizza;
  const percentOff = pizza.discount ? pizza.discount : null;
  let offPrice = `${price}dt`;

  if (percentOff && percentOff > 0) {
    offPrice = (
      <>
        <del>{price}dt</del> {price - (percentOff * price) / 100}dt
      </>
    );
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={`/products/${pizza.id}`} replace>
          {percentOff && (
            <div
              className="badge bg-dim py-2 text-white position-absolute"
              style={{ top: "0.5rem", left: "0.5rem" }}
            >
              {percentOff}% OFF
            </div>
          )}
          <img
            className="rounded-start bg-dark cover w-100 h-100"
            alt={name}
            src={image}
          />
        </Link>
        <div className="card-body h-100">
          <h5 className="card-title text-dark text-truncate mb-1">{name}</h5>
          <span className="card-text text-muted mb-2 flex-shrink-0">
            {offPrice}
          </span>
          <div className="mt-auto d-flex">
            <button className="btn btn-outline-dark ms-auto">
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
