import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";

function ProductDetail() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    // Remplacez cette URL par celle correspondant à votre API ou source de données
    fetch(`http://localhost:5000/api/list/pizzas/id/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPizza(data);
      })
      .catch((error) => console.error("Erreur de récupération des détails :", error));
  }, [id]);

  if (!pizza) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <div className="row mb-4">
        <div className="col-lg-6">
          <img
            className="border rounded ratio ratio-1x1"
            alt={pizza.name}
            src={pizza.imageUrl}
          />
        </div>
        <div className="col-lg-6">
          <h2>{pizza.name}</h2>
          <h4 className="text-muted">{pizza.price} dt</h4>
          <p>{pizza.description}</p>
          <p><strong>Category:</strong> {pizza.category}</p>
          <p><strong>Crust:</strong> {pizza.crust}</p>
          <p><strong>Size:</strong> {pizza.size.join(", ")}</p>
          <p><strong>Toppings:</strong> {pizza.toppings.join(", ")}</p>
          <p><strong>Ingredients:</strong> {pizza.ingredients.join(", ")}</p>
          <p><strong>Calories:</strong> {pizza.calories}</p>
          <p><strong>Discount:</strong> {pizza.discount}%</p>
          <p><strong>Available:</strong> {pizza.isAvailable ? "Yes" : "No"}</p>
          <p><strong>Date Added:</strong> {new Date(pizza.dateAdded).toLocaleDateString()}</p>
          <button className="btn btn-dark py-2 w-100">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
