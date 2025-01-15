const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  id: { type: Number, required: true },  // Utilisation de l'ID de type nombre
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: [String], required: true },
  crust: { type: String, required: true },
  toppings: { type: [String], required: true },
  category: { type: String, required: true },
  discount: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  calories: { type: Number },
  ingredients: { type: [String] },
  dateAdded: { type: Date, default: Date.now }
});

const Pizza = mongoose.model('Pizza', pizzaSchema);
module.exports = Pizza;