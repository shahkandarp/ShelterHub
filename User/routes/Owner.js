const express = require("express");
const router = express.Router();
const OwnerMiddleware = require("../middleware/authentication_owner");

const {
  forgotPasswordOwner,
  loginOwner,
  registerOwner,
} = require("../controllers/Owner");

//authentication owner
router.route("/login").post(loginOwner);
router.route("/register").post(registerOwner);
router.route("/forgotpassword").patch(forgotPasswordOwner);

//owner details

const {
  ownerVerifyOTP,
  changePassword,
  updateOwner,
  displayOwner,
  createRoom,
  displayAllRooms,
  displayRoom,
  updateRoom,
  showInterests,
  mobileOTPSend,
  mobileOTPVerify,
  getStatus,
  deleteRoom,
  showReview,
  deleteReview,
  deleteOwner,
  updateEmail,
  verifynewemail,
  getPGDetails
} = require("../controllers/Owner");

router.route("/verifyotp").post(ownerVerifyOTP);
router.route("/changepassword").post(changePassword);
router.route("/updateowner").post(OwnerMiddleware, updateOwner);
router.route("/displayowner").get(OwnerMiddleware, displayOwner);
router.route("/createroom").post(OwnerMiddleware, createRoom);
router.route("/displayallrooms").get(OwnerMiddleware, displayAllRooms);
router.route("/displayroom/:rid").get(OwnerMiddleware, displayRoom);
router.route("/updateroom/:rid").post(OwnerMiddleware, updateRoom);
router.route("/showinterests").get(OwnerMiddleware, showInterests);
router.route("/mobileOTPSend").post(OwnerMiddleware, mobileOTPSend);
router.route("/mobileOTPVerify").post(OwnerMiddleware, mobileOTPVerify);
router.route("/getstatus").get(OwnerMiddleware, getStatus);
router.route('/deleteroom/:rid').delete(OwnerMiddleware,deleteRoom)
router.route('/showreview').get(OwnerMiddleware,showReview)
router.route('/deletereview/:rid').delete(OwnerMiddleware,deleteReview)
router.route('/deleteowner').post(deleteOwner)
router.route('/updateemail').post(OwnerMiddleware,updateEmail)
router.route('/verifynewemail').post(OwnerMiddleware,verifynewemail)
router.route('/getPGDetails').get(getPGDetails)

module.exports = router;
