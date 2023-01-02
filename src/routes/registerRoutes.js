const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerController')

router.get('/', registerController.loadRegisterPage)
router.post('/createUser', registerController.createUser)

module.exports = router