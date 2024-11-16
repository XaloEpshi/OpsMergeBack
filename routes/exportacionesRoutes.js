const express = require('express');
const router = express.Router();
const exportacionesController = require('../controllers/exportacionesController');

// Crear una nueva exportación
router.post('/', exportacionesController.createExportacion);

// Obtener todas las exportaciones
router.get('/', exportacionesController.getExportaciones);

// Obtener una exportación por ID
router.get('/:id', exportacionesController.getExportacionById);

// Actualizar el estado de una exportación
router.put('/status/:id', exportacionesController.updateExportacionStatus);

// Actualizar una exportación
router.put('/:id', exportacionesController.updateExportacion);

// Eliminar una exportación
router.delete('/:id', exportacionesController.deleteExportacion);

module.exports = router;
