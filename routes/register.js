const express = require('express')
const router = express.Router()
const registerController = require('../controllers/register')

router.get('/', registerController.loadRegisterPage)

module.exports = router