const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController'); // Asegúrate de que esta ruta sea correcta

// Ruta para obtener todas las consultas
router.get('/', consultaController.getConsultas);

// Ruta para crear una nueva consulta (GET)
router.get('/create', consultaController.createConsultaForm);

// Ruta para almacenar una nueva consulta (POST)
router.post('/create', consultaController.createConsulta);

// Ruta para editar una consulta (GET)
router.get('/edit/:id', consultaController.editConsultaForm);

// Ruta para actualizar una consulta (POST)
router.post('/edit/:id', consultaController.updateConsulta);

// Ruta para eliminar una consulta
router.post('/delete/:id', consultaController.deleteConsulta);

module.exports = router;