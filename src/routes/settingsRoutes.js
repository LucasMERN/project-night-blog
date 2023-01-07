const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const settingsController = require('../controllers/settingsController');

router.get('/:id', settingsController.getSettings);
router.get('/accountinfo/:id', settingsController.getAccountInfo);
router.get('/display/:id', settingsController.getDisplay);
router.get('/deactivate/:id', settingsController.getGone);
router.put('/:id/updateUsername', settingsController.updateUsername);
router.put('/:id/updateEmail', settingsController.updateEmail);
router.put('/:id/updatePassword', settingsController.updatePassword);

module.exports = router