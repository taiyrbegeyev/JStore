const express = require('express')
const { signup } = require('../controllers')

const router = express.Router()

router.get('/signup', signup)

module.exports = router
