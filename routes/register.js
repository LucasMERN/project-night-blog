const express = require('express')
const router = express.Router()
const registerController = require('../controllers/register')

router.get('/', registerController.loadRegisterPage)
router.post('/createUser', registerController.createUser)

module.exports = router