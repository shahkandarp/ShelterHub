const express = require('express')
const router = express.Router()

const {ownerVerifyOTP,changePassword,updateOwner,displayOwner,createRoom,displayAllRooms,displayRoom,updateRoom,showInterests} = require('../controllers/Owner')

router.route('/verifyotp').post(ownerVerifyOTP)
router.route('/changepassword').post(changePassword)
router.route('/updateowner').post(updateOwner)
router.route('/displayowner').get(displayOwner)
router.route('/createroom').post(createRoom)
router.route('/displayallrooms').get(displayAllRooms)
router.route('/displayroom/:rid').get(displayRoom)
router.route('/updateroom/:rid').post(updateRoom)
router.route('/showinterests').get(showInterests)

module.exports = router