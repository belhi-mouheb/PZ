// src/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Créer un contexte pour le panier
const CartContext = createContext();

// Fournisseur de contexte pour envelopper l'application
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find((item) => item.id === product.id);
      if (productExists) {
        // Si le produit existe déjà, augmenter la quantité
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si le produit n'existe pas, l'ajouter avec une quantité de 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Fonction pour obtenir la quantité totale d'articles dans le panier
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Fonction pour mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) } // La quantité ne peut pas être inférieure à 1
          : item
      )
    );
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, getCartCount, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => useContext(CartContext);
