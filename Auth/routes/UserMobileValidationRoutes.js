const express = require('express')
const router = express.Router()

const {sendUserOTP,verifyUserOTP} = require('../controllers/User')

router.route('/sendmobileotp').post(sendUserOTP)
router.route('/verifymobileotp').post(verifyUserOTP)


module.exports = router