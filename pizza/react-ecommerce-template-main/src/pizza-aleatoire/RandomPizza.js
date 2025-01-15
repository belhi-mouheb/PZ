import React, { useState, useEffect } from "react";
import { useCart } from "../panier/CartContext"; // Importer le hook personnalisé pour le panier

function RandomPizza() {
  const { addToCart } = useCart(); // Utilisation de `addToCart` depuis le contexte du panier
  const [pizzas, setPizzas] = useState([]); // Liste des pizzas
  const [randomPizza, setRandomPizza] = useState(null); // Pizza sélectionnée aléatoirement
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(""); // Gestion des erreurs

  useEffect(() => {
    // Appel API pour récupérer les pizzas
    fetch("http://localhost:5000/api/list/pizzas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des pizzas");
        }
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleGeneratePizza = () => {
    if (pizzas.length > 0) {
      const randomIndex = Math.floor(Math.random() * pizzas.length);
      setRandomPizza(pizzas[randomIndex]);
    }
  };

  if (loading) {
    return <p>Chargement des pizzas...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  // Vérification du type de `ingredients`
  const renderIngredients = () => {
    if (Array.isArray(randomPizza.ingredients)) {
      // Si `ingredients` est un tableau, on l'affiche sous forme de liste verticale
      return randomPizza.ingredients.map((ingredient, index) => (
        <span key={index} style={{ display: "block" }}>
          {ingredient}
        </span>
      ));
    } else if (typeof randomPizza.ingredients === "string") {
      // Si `ingredients` est une chaîne de caractères, on la sépare par des virgules
      return randomPizza.ingredients.split(",").map((ingredient, index) => (
        <span key={index} style={{ display: "block" }}>
          {ingredient}
        </span>
      ));
    } else {
      return <span>Ingrédients non disponibles</span>;
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Pizza Aléatoire 🍕</h1>
      {/* Bouton pour générer une pizza aléatoire */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleGeneratePizza}
          style={{
            backgroundColor: "#ff5733",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Générer une Pizza
        </button>
      </div>

      {randomPizza && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            display: "inline-block",
            textAlign: "left",
            maxWidth: "300px",
          }}
        >
          <img
            src={randomPizza.imageUrl} // Assurez-vous que le champ 'imageUrl' est correct
            alt={randomPizza.name}
            style={{
              width: "250px", // Taille standard de l'image
              height: "auto",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />
          <h2 style={{ textAlign: "center" }}>{randomPizza.name}</h2>
          <div>
            <strong>Ingrédients :</strong>
            <p>{renderIngredients()}</p>
          </div>
          <p>
            <strong>Prix :</strong> {randomPizza.price.toFixed(2)} dt
          </p>
          {/* Bouton pour ajouter la pizza au panier */}
          <button
            onClick={() => addToCart(randomPizza)} // Ajouter la pizza au panier via le contexte
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
              display: "block",
              width: "100%",
            }}
          >
            Ajouter au Panier
          </button>
        </div>
      )}
    </div>
  );
}

export default RandomPizza;
