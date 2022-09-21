const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes');

router.put('/:id', likesController.updateLike);

module.exports = router