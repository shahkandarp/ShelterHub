const express = require('express')
const router = express.Router()

const {loginOwner} = require('../controllers/Owner')

router.route('/').post(loginOwner)


module.exports = router