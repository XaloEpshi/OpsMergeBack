// routes/tareasRoutes.js
const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

router.post('/tareas', tareasController.createTarea);
router.get('/tareas', tareasController.getTareas);
router.get('/tareas/:id', tareasController.getTareaById);
router.put('/tareas/:id', tareasController.updateTarea);
router.delete('/tareas/:id', tareasController.deleteTarea);

module.exports = router;
