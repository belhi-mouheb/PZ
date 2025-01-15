const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

// Route GET pour récupérer toutes les pizzas
router.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await Pizza.find(); // Récupère toutes les pizzas
    res.status(200).json(pizzas); // Renvoie les pizzas en JSON
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des pizzas.', error });
  }
});
router.get('/pizzas/id/:id', async (req, res) => {
  const pizzaId = parseInt(req.params.id); // Convertir l'ID de chaîne à nombre entier

  try {
    const pizza = await Pizza.findOne({ id: pizzaId }); // Recherche par id entier
    if (!pizza) {
      return res.status(404).json({ message: "Pizza non trouvée" });
    }
    res.status(200).json(pizza);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la pizza.', error });
  }
});

module.exports = router;
