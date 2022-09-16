const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/addComment', commentsController.addComment);
router.delete('/deleteComment/:id', commentsController.deleteComment);

module.exports = router;