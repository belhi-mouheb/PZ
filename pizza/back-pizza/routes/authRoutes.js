const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Assurez-vous que le chemin vers le modèle User est correct
const router = express.Router();

// Route pour l'inscription
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        // Réponse après la création de l'utilisateur
        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
});

// Route pour la connexion
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Vérifier le mot de passe avec bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Si la connexion est réussie, renvoyer l'email de l'utilisateur
        res.json({ message: 'Connexion réussie.', email: user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue.' });
    }
});

// Route pour récupérer le profil d'un utilisateur
router.get('/profile', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,  // Ajoutez le champ phone si nécessaire
            avatarUrl: user.avatarUrl // Ajoutez avatarUrl si nécessaire
        });
    } catch (err) {
        res.status(500).send('Error fetching user profile');
    }
});

// Route pour mettre à jour les informations d'un utilisateur
router.put('/profile', async (req, res) => {
    const { firstName, lastName, email, phone, avatarUrl } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Mettre à jour les informations
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phone = phone || user.phone;
        user.avatarUrl = avatarUrl || user.avatarUrl;

        await user.save(); // Sauvegarder les modifications

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            avatarUrl: user.avatarUrl
        });
    } catch (err) {
        res.status(500).send('Error updating user profile');
    }
});

module.exports = router;
