const express = require("express");
const Owner = require("../models/Owner");
const Room = require("../models/Room");
const Interest = require("../models/Interest");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
const nodemailer = require("nodemailer");
const fast2sms = require('fast-two-sms');
const bcrypt = require("bcryptjs");

//utility
const calculateDistance = (lat1, lat2, lon1, lon2) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d / 1000; //in kms
};
const nearByPgs = async (lat, lng, pgs = null) => {
  var pg_array = [];
  if (pgs) {
    for (let i = 0; i < pgs.length; i++) {
      if (calculateDistance(pgs[i].lat, lat, pgs[i].lng, lng) <= 10) {
        pg_array.push(pgs[i]);
      }
    }
  } else {
    const pg = await Owner.find({});
    for (let i = 0; i < pg.length; i++) {
      if (calculateDistance(pg[i].lat, lat, pg[i].lng, lng) <= 10) {
        pg_array.push(pg[i]);
      }
    }
  }
  return pg_array;
};


//authentication
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequestError("Please provide necessary credentials");
  }
  const userx = await User.findOne({email:req.body.email})
  if(userx){
    throw new BadRequestError("This Email already Exists");
  }
  if(req.body.password.length<8){
    throw new BadRequestError("Minimum size of password should be 8");
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, id: user._id }, token });
};

const forgotPasswordUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  console.log(otp);
  const user = await User.findOneAndUpdate(
    { email: email },
    { mailotp: otp },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new BadRequestError("Please provide valid email");
  }


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "hetpatel5542@gmail.com",
      pass: "xivslyvrfcrgewtb",
    },
  });

  const mailOptions = {
    from: '"Nivaas " <hetpatel5542@gmail.com>', // sender address (who sends)
    to: `${email}`, // list of receivers (who receives)
    subject: "OTP for Reseting Your User App Password ", // Subject line
    text: `Your OTP for reseting the password for User app is ${otp}, please enter this OTP in your User app to reset your password.
-Thanks,
Team Nivaas  `, // plaintext body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    res.status(StatusCodes.OK).json({ otpsent: true });
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, id: user._id }, token });
};

const sendUserOTP = async (req,res) => {
  const {userId} = req.user
  var {phoneno} = req.body
  if(!phoneno){
    throw new BadRequestError("Please provide Phone Number");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  const user = await User.findOneAndUpdate({_id:userId},{phoneotp:otp,phoneno},{ runValidators: true, new: true, setDefaultsOnInsert: true })
  var options = {authorization : process.env.API_KEY , message : `${otp} is your verification code for Nivaas, valid for 15 min. Please do not share with others.` ,  numbers : [
    `${phoneno}`]} 
  const response = await fast2sms.sendMessage(options)
  res.status(StatusCodes.OK).json({res:'Success',data:response})
}

const verifyUserOTP = async (req,res) => {
  const {userId} = req.user
  const {otp} = req.body
  if(!otp){
    throw new BadRequestError("Please provide OTP");
  }
  const user = await User.findOne({_id:userId})
  if(user.phoneotp != Number(otp)){
    throw new BadRequestError("Please provide valid OTP");
  }
  res.status(StatusCodes.OK).json({res:'Success'})
}


//pgs
const getPGDetails = async (req, res) => {
  const { pid } = req.params;
  const pg = await Owner.findOne({ _id: pid });
  if (!pg) {
    throw new BadRequestError("No PG with provided pg id!");
  } else {
    res.status(StatusCodes.OK).json({ res: "success", data: pg });
  }
};
const getSpecificPgs = async (req, res) => {
  const { uid } = req.params;
  const { search, sort } = req.query;
  const user = await User.findOne({ _id: uid });
  if (!user) {
    throw new NotFoundError("User does not exists!");
  } else {
    if (search) {
      const pgs = await Owner.find({ name: { $regex: search, $options: "i" } });
      res.status(StatusCodes.OK).json({ res: "success", data: pgs });
    }
    if (sort) {
      const pgs = await Owner.find({}).sort(sort);
      let nearby_pgs = await nearByPgs(user.lat, user.lng,pgs);
      res.status(StatusCodes.OK).json({ res: "success", data: nearby_pgs });
    }
  }
};
const getNearbyPgs = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({_id:uid});
  if(!user){
    throw new NotFoundError("User does not exists!");
  }
  else{
    let nearby_pgs = await nearByPgs(user.lat,user.lng);
    res.status(StatusCodes.OK).json({res:"success",data:nearby_pgs})
  }
};
const getFilteredPgs = async (req, res) => {
  res.status(StatusCodes.OK).send("hI");
};

//user
const getUserDetails = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ _id: uid });
  if (!user) {
    throw new NotFoundError("User does not exists!");
  } else {
    res.status(StatusCodes.OK).json({ res: "success", data: user });
  }
};
const updateUserDetails = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOneAndUpdate({ _id: uid }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFoundError("User does not exists!");
  } else {
    res.status(StatusCodes.OK).json({ res: "success", data: user });
  }
};
const validateOtp = async (req, res) => {
  const { otp } = req.body;
  const { email } = req.params;
  if (!otp) {
    throw new BadRequestError("Please provide otp in the body");
  } else {
    const user = await User.findOne({ email: email });
    if (user.otp !== otp) {
      res.status(StatusCodes.OK).json({ res: "failed", data: "Invalid otp" });
    } else {
      res.status(StatusCodes.OK).json({ res: "success", data: "valid otp" });
    }
  }
};
const changeUserPassword = async (req, res) => {
  const { email } = req.params;
  var { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const user = await User.findOneAndUpdate(
    { email: email },
    { password },
    { new: true, runValidators: true, setDefaultsOnInsert: true }
  );
  if (!user) {
    throw new NotFoundError("user not found");
  } else {
    res.status(StatusCodes.OK).json({ res: "success", data: user });
  }
};

//interests
const getCurrentInterests = async (req, res) => {
  res.status(StatusCodes.OK).send("hI");
};
const createUserInterest = async (req, res) => {
  res.status(StatusCodes.OK).send("hI");
};
module.exports = {
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
  registerUser,
  forgotPasswordUser,
  loginUser,
  sendUserOTP,
  verifyUserOTP
};
