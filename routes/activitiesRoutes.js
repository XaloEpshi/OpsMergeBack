const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');

router.get('/', activitiesController.getAllActivities);

module.exports = router;
