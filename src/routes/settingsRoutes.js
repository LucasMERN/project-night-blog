const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const settingsController = require('../controllers/settingsController');

router.get('/:id', settingsController.getSettings);

module.exports = router