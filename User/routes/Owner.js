const express = require("express");
const router = express.Router();
const OwnerMiddleware = require('../middleware/authentication_owner')

const {forgotPasswordOwner,loginOwner,registerOwner} = require('../controllers/Owner')
const authMiddleware = require('../middleware/authentication_owner');

//authentication owner
router.route('/login').post(authMiddleware,loginOwner);
router.route('/register').post(authMiddleware,registerOwner);
router.route('/forgotpassword').patch(authMiddleware,forgotPasswordOwner);

//owner details

const {ownerVerifyOTP,changePassword,updateOwner,displayOwner,createRoom,displayAllRooms,displayRoom,updateRoom,showInterests,mobileOTPSend,mobileOTPVerify} = require('../controllers/Owner')

router.route('/verifyotp').post(ownerVerifyOTP)
router.route('/changepassword').post(changePassword)
router.route('/updateowner').post(OwnerMiddleware,updateOwner)
router.route('/displayowner').get(OwnerMiddleware,displayOwner)
router.route('/createroom').post(OwnerMiddleware,createRoom)
router.route('/displayallrooms').get(OwnerMiddleware,displayAllRooms)
router.route('/displayroom/:rid').get(OwnerMiddleware,displayRoom)
router.route('/updateroom/:rid').post(OwnerMiddleware,updateRoom)
router.route('/showinterests').get(OwnerMiddleware,showInterests)
router.route('/mobileOTPSend').post(OwnerMiddleware,mobileOTPSend)
router.route('/mobileOTPVerify').post(OwnerMiddleware,mobileOTPVerify)

module.exports = router