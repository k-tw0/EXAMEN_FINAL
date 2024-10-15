const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController'); // Asegúrate de que esta ruta sea correcta

// Ruta para obtener la lista de médicos y pacientes
router.get('/', medicoController.getMedicos);

// Ruta para obtener todas las consultas
router.get('/consultas', medicoController.getConsultas);

// Ruta para editar un paciente (GET)
router.get('/edit/:id', medicoController.editPaciente);

// Ruta para actualizar un paciente (POST)
router.post('/edit/:id', medicoController.updatePaciente);

// Ruta para eliminar un paciente
router.post('/delete/:id', medicoController.deletePaciente);

module.exports = router;