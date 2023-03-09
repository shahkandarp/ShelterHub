const express = require("express");
const router = express.Router();

const {
  getSpecificPgs,
  getPGDetails,
  getNearbyPgs,
  getFilteredPgs,
  getUserDetails,
  updateUserDetails,
  validateOtp,
  changeUserPassword,
  getCurrentInterests,
  createUserInterest,
} = require("../controllers/User");

//pg
router.route("/pg/:pid").get(getPGDetails); //get pg by it's id, this will also increase the view count [:pid = pg/owner id]
router.route("/:uid/pg").get(getSpecificPgs); //get specific and top rated pgs [?search=' '] [?sort=ratings]
router.route("/:uid/pg/nearby").get(getNearbyPgs); //nearby pgs [:uid = user id]
router.route("/pg/filter").post(getFilteredPgs); //get pgs after applying the main filter [req.body={location:'Kota',isAC:True}]

//user
router.route("/:uid").get(getUserDetails); //get user by it's id [:uid = user id]
router.route("/:uid").patch(updateUserDetails); //update user details [:uid = user id]
router.route("/:email/validateOTP").post(validateOtp); //validate otp [req.body = {otp:1234}]
router.route("/:email/password").post(changeUserPassword); //change password [req.body = {password:' '}]

//interest
router.route("/:uid/interest").get(getCurrentInterests); //pgs in which user is interested
router.route("/:uid/interest").post(createUserInterest); //call this api when the user clicks interested button [req.body={room:room_id}]

module.exports = router;
