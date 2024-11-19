const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

// Ruta para obtener todos los eventos
router.get('/', agendaController.getAllEvents);

// Ruta para obtener un evento por ID
router.get('/:id', agendaController.getEventById);

// Ruta para crear un nuevo evento
router.post('/', agendaController.createEvent);

// Ruta para actualizar un evento existente
router.put('/:id', agendaController.updateEvent);

// Ruta para eliminar un evento
router.delete('/:id', agendaController.deleteEvent);

module.exports = router;
