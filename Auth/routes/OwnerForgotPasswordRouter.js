const express = require('express')
const router = express.Router()

const {forgotPasswordOwner} = require('../controllers/Owner')

router.route('/').patch(forgotPasswordOwner)


module.exports = router