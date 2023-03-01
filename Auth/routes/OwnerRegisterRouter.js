const express = require('express')
const router = express.Router()

const {registerOwner} = require('../controllers/Owner')

router.route('/').post(registerOwner)


module.exports = router