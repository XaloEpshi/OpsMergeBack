const express = require('express');
const router = express.Router();
const calendarioController = require('../controllers/calendarioController');

// Rutas CRUD para eventos
router.post('/events', calendarioController.createEvent);//Crea Evento
router.get('/events', calendarioController.getEvents);
router.get('/events/:id', calendarioController.getEventById);
router.put('/events/:id', calendarioController.updateEvent);
router.delete('/events/:id', calendarioController.deleteEvent);

module.exports = router;
