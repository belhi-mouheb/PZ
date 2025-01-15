const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza'); // Importer le modèle Pizza
const Order = require('../models/Order');

// Créer une nouvelle commande
router.post('/create', async (req, res) => {
  const { userEmail, shippingAddress, items } = req.body;
  let totalPrice = 0;

  try {
    // Récupérer les informations de chaque pizza par son ID
    const pizzaItems = await Promise.all(items.map(async (item) => {
      const pizza = await Pizza.findOne({ id: item.id }); // Trouver la pizza par son ID
      if (!pizza) {
        throw new Error(`Pizza avec l'ID ${item.id} non trouvée.`);
      }

      // Calculer le prix total pour cet article
      const itemTotal = pizza.price * item.quantity;
      totalPrice += itemTotal;

      return {
        pizzaId: pizza._id, // Utiliser l'ID de la pizza trouvé
        name: pizza.name,
        price: pizza.price,
        quantity: item.quantity,
        imageUrl: pizza.imageUrl, // Inclure l'URL de l'image de la pizza
      };
    }));

    // Ajouter les frais de livraison (par exemple 20)
    const deliveryCharge = 20;
    totalPrice += deliveryCharge;

    // Créer la commande
    const newOrder = new Order({
      userEmail,
      shippingAddress,
      items: pizzaItems,
      totalPrice, // Total incluant les frais de livraison
      deliveryCharge,
    });

    // Sauvegarder la commande dans la base de données
    await newOrder.save();

    res.status(201).json({ message: 'Commande créée avec succès', order: newOrder });
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
});

// Obtenir toutes les commandes d'un utilisateur par email
// Obtenir toutes les commandes d'un utilisateur par email
router.get('/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const orders = await Order.find({ userEmail: email }); // Trouver toutes les commandes pour cet email
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Aucune commande trouvée pour cet utilisateur.' });
    }

    // Formater les résultats pour qu'ils soient compatibles avec le front
    const formattedOrders = orders.map(order => ({
      shippingAddress: order.shippingAddress,
      items: order.items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl || "https://via.placeholder.com/150", // Image par défaut
      })),
      totalPrice: order.totalPrice,
      dateCreated: order.dateCreated, // La date sera affichée au format FR dans le front
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
});

module.exports = router;
