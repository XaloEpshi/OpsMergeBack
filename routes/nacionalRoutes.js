const express = require('express');
const router = express.Router();
const despachoController = require('../controllers/nacionalController');

router.get('/despacho', despachoController.getAllDispatches);
router.get('/despacho/:id', despachoController.getDispatchById);
router.post('/despacho', despachoController.createDispatch);
router.put('/despacho/:id', despachoController.updateDispatch);
router.delete('/despacho/:id', despachoController.deleteDispatch);

module.exports = router;
