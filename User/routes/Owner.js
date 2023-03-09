const express = require("express");
const router = express.Router();

const {forgotPasswordOwner,loginOwner,registerOwner} = require('../controllers/Owner')

//authentication owner
router.route('/login').post(loginOwner);
router.route('/register').post(registerOwner);
router.route('/forgotpassword').patch(forgotPasswordOwner);

module.exports = router