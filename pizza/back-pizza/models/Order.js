const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  items: [{
    pizzaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', required: true }, // Référence à l'ID de la pizza
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true } // Ajouter l'URL de l'image
  }],
  totalPrice: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
