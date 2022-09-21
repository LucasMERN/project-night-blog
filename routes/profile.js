const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

router.get('/:id', profileController.getProfile);
router.put('/:id/updateBio', profileController.postBio);

module.exports = router