const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/myprofile/:id', profileController.getProfile);
router.put('/:id/updateBio', profileController.updateBio);
router.put('/:id/follow', profileController.followUser);

module.exports = router