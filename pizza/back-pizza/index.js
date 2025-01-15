const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Importer les routes d'authentification
const app = express();
const pizzaR = require('./routes/recup-pizza'); // Importer les routes d'authentification
const orderRoutes = require('./routes/orderRoutes');

// Charger les variables d'environnement
dotenv.config();

// Middleware pour gérer les CORS et les données JSON
app.use(cors());
app.use(express.json()); // Pour pouvoir récupérer les données envoyées en JSON

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(err => console.log("Erreur de connexion à MongoDB: ", err));

// Utilisation des routes d'authentification
app.use('/api/auth', authRoutes);
app.use('/api/list', pizzaR);
app.use('/api/orders', orderRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
