const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.get('/:id', settingsController.getSettings);

module.exports = router