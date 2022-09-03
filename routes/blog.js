const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');

router.get('/blog', blogController.getIndex);

module.exports = router;
