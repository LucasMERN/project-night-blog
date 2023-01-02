const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

//Load home page
router.get('/', homeController.getIndex);

module.exports = router;