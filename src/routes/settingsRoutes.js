const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.get('/:id', settingsController.getSettings);
router.get('/accountinfo/:id', settingsController.getAccountInfo);
router.get('/display/:id', settingsController.getDisplay);
router.get('/deactivate/:id', settingsController.getGone);

module.exports = router