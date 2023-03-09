const express = require("express");
const router = express.Router();

const {forgotPasswordOwner,loginOwner,registerOwner} = require('../controllers/Owner')
const authMiddleware = require('../middleware/authentication_owner');

//authentication owner
router.route('/login').post(authMiddleware,loginOwner);
router.route('/register').post(authMiddleware,registerOwner);
router.route('/forgotpassword').patch(authMiddleware,forgotPasswordOwner);

module.exports = router