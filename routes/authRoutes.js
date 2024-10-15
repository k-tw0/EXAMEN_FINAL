const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para mostrar el formulario de inicio de sesión
router.get('/', (req, res) => {
    res.render('login'); // Renderiza la vista de login
});

// Ruta para manejar el inicio de sesión
router.post('/login', authController.login);

module.exports = router;