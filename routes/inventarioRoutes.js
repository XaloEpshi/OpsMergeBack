const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// Ruta para obtener todas las bodegas
router.get('/bodegas', inventarioController.getAllBodegas);

// Ruta para obtener una bodega por ID
router.get('/bodegas/:id', inventarioController.getBodegaById);

// Ruta para crear una nueva bodega
router.post('/bodegas', inventarioController.createBodega);

// Ruta para actualizar una bodega existente
router.put('/bodegas/:id', inventarioController.updateBodega);

// Ruta para eliminar una bodega
router.delete('/bodegas/:id', inventarioController.deleteBodega);

module.exports = router;
