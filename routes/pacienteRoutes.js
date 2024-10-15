const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController'); // Asegúrate de que esta ruta sea correcta

// Ruta para obtener los datos del paciente logueado
router.get('/', pacienteController.getPaciente);

// Ruta para editar un paciente (GET)
router.get('/edit', pacienteController.editPaciente); // Cambiado a /edit sin parámetros

// Ruta para actualizar un paciente (POST)
router.post('/edit', pacienteController.updatePaciente); // Cambiado a /edit sin parámetros

module.exports = router;