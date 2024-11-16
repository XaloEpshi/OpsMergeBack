const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.get('/', agendaController.getAllEvents);
router.get('/:id', agendaController.getEventById);
router.post('/', agendaController.createEvent);
router.put('/:id', agendaController.updateEvent);
router.delete('/:id', agendaController.deleteEvent);

module.exports = router;
