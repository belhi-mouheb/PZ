const mongoose = require('mongoose');

// Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
      phone: { type: String }, // Champ téléphone (facultatif)
        avatarUrl: { type: String } // URL de l'avatar (facultatif)
});

// Création du modèle basé sur le schéma
const User = mongoose.model('User', userSchema);

// Exportation du modèle pour pouvoir l'utiliser ailleurs
module.exports = User;

