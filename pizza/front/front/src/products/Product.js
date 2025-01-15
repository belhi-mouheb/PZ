import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useCart } from "../panier/CartContext";

function Product({ pizza }) {
  const { id, name, price, imageUrl, discount } = pizza;
  const { addToCart } = useCart();

  const percentOff = discount ? discount : null;
  let offPrice = `${price}dt`;

  if (percentOff && percentOff > 0) {
    offPrice = (
      <>
        <del>{price}dt</del> {price - (percentOff * price) / 100}dt
      </>
    );
  }

  // Fonction qui s'exécute lors de l'ajout au panier
  const handleAddToCart = () => {
    addToCart(pizza);
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={`/products/${id}`} replace>
          {percentOff && (
            <div
              className="badge bg-dim py-2 text-white position-absolute"
              style={{ top: "0.5rem", right: "0.5rem" }}
            >
              {percentOff}% OFF
            </div>
          )}
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt={name}
            src={imageUrl}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {name}
          </h5>
          <p className="card-text text-center text-muted mb-0">{offPrice}</p>
          <div className="d-grid d-block">
            <button
              className="btn btn-outline-dark mt-3"
              onClick={handleAddToCart} // Appeler la fonction handleAddToCart
            >
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
