const express = require('express')
const router = express.Router()
const bookmarkController = require('../controllers/bookmarkController')

router.post('/:id', bookmarkController.bookmarkPost)

module.exports = router