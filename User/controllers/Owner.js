// const Owner = require("../models/Owner");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const fast2sms = require("fast-two-sms");
const Owner = require("../models/Owner");
const Room = require("../models/Room");
const Interest = require("../models/Interest");
const User = require("../models/User");

//authentication owner
const registerOwner = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequestError("Please provide necessary credentials");
  }
  const ownerx = await Owner.findOne({ email: req.body.email });
  if (ownerx) {
    throw new BadRequestError("This Email already Exists");
  }
  if (req.body.password.length < 6) {
    throw new BadRequestError("Minimum size of password should be 6");
  }
  const owner = await Owner.create(req.body);
  const token = owner.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: owner.name, id: owner._id }, token });
};

const forgotPasswordOwner = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  const owner = await Owner.findOneAndUpdate(
    { email: email },
    { mailotp: otp },
    { new: true, runValidators: true }
  );
  if (!owner) {
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
    text: `Your OTP for reseting the password for Owner app is ${otp}, please enter this OTP in your User app to reset your password.
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

const loginOwner = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const owner = await Owner.findOne({ email });
  if (!owner) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await owner.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = owner.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: owner.name,
      id: owner._id,
      phoneVerified: owner.phoneVerified,
      detailsEntered: owner.detailsEntered,
    },
    token,
  });
};

const ownerVerifyOTP = async (req,res) => {
  const {email} = req.body
  if(!email){
    throw new BadRequestError("Please provide OTP");
  }
  const ownerx = await Owner.findOne({email});
  const {otp} = req.body
  if(!otp){
    throw new BadRequestError("Please provide OTP");
  }
  const owner = await Owner.findOne({_id:ownerx._id})
  if(owner.mailotp != Number(otp)){
    throw new BadRequestError("Please provide valid OTP");
  }
  res.status(StatusCodes.OK).json({ res: "Success" });
};

const changePassword = async (req,res) => {
  const {email} = req.body
  if(!email){
    throw new BadRequestError("Please provide OTP");
  }
  const ownerx = await Owner.findOne({email});
  var {password} = req.body
  if(!password){
    throw new BadRequestError("Please provide password");
  }
  if (password.length < 6) {
    throw new BadRequestError("Minimum length of password is 6");
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const owner = await Owner.findOneAndUpdate({_id:ownerx._id},{password},{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success'})
}

const updateOwner = async (req, res) => {
  const { ownerId } = req.user;
  const owner = await Owner.findOneAndUpdate({ _id: ownerId }, req.body, {
    runValidators: true,
    new: true,
    setDefaultsOnInsert: true,
  });
  res.status(StatusCodes.OK).json({ res: "Success", data: owner });
};

const displayOwner = async (req, res) => {
  const { ownerId } = req.user;
  const owner = await Owner.findOne({ _id: ownerId });
  res.status(StatusCodes.OK).json({ res: "Success", data: owner });
};

const createRoom = async (req, res) => {
  const { ownerId } = req.user;
  const { title, occupancy, availablerooms, price } = req.body;
  if (!title || !occupancy || !availablerooms || !price) {
    throw new BadRequestError("Please provide valid credentials");
  }
  req.body.ownerId = ownerId;
  const room = await Room.create(req.body);
  res.status(StatusCodes.OK).json({ res: "Success", data: room });
};

const displayAllRooms = async (req, res) => {
  const { ownerId } = req.user;
  const rooms = await Room.find({ ownerId });
  res.status(StatusCodes.OK).json({ res: "Success", data: rooms });
};

const displayRoom = async (req, res) => {
  const { ownerId } = req.user;
  const { rid } = req.params;
  if (!rid) {
    throw new BadRequestError("Please provide Room ID");
  }
  const room = await Room.findOne({ _id: rid });
  if (!room) {
    throw new BadRequestError("Please provide Valid Room ID");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: room });
};

const updateRoom = async (req, res) => {
  const { ownerId } = req.user;
  const { rid } = req.params;
  if (!rid) {
    throw new BadRequestError("Please provide Room ID");
  }
  const room = await Room.findOneAndUpdate({ _id: rid }, req.body, {
    runValidators: true,
    new: true,
    setDefaultsOnInsert: true,
  });
  if (!room) {
    throw new BadRequestError("Please provide Valid Room ID");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: room });
};

const showInterests = async (req, res) => {
  const { ownerId } = req.user;
  const interests = await Interest.find({ ownerId });
  const arr = [];
  var i = 0;
  interests.forEach((interest) => {
    const d = new Date();
    const todayMonth = d.getMonth() + 1;
    const todayYear = d.getFullYear();
    var interestDate = new Date(interest.createdAt);
    const interestMonth = interestDate.getMonth() + 1;
    const interestYear = interestDate.getFullYear();
    if (todayMonth == interestMonth && todayYear == interestYear) {
      arr[i] = interest;
      ++i;
    }
  });
  const arr1 = [];
  var j = 0;
  for (i = 0; i < arr.length; ++i) {
    var obj = {};
    const user = await User.findOne({ _id: arr[i].userId });
    obj.username = user.name;
    obj.userphoneno = user.phoneno;
    obj.useremail = user.email;
    const room = await Room.findOne({ _id: arr[i].roomId });
    obj.roomtitle = room.title;
    obj.createdAt = arr[i].createdAt;
    arr1[j] = obj;
    ++j;
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: arr1 });
};

const mobileOTPSend = async (req, res) => {
  const { ownerId } = req.user;
  var { phoneno } = req.body;
  if (!phoneno) {
    throw new BadRequestError("Please provide Phone Number");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  console.log(otp);
  const owner = await Owner.findOneAndUpdate(
    { _id: ownerId },
    { phoneotp: otp, phoneno },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );
  var options = {
    authorization: process.env.API_KEY,
    message: `${otp} is your verification code for Nivaas, valid for 15 min. Please do not share with others.`,
    numbers: [`${phoneno}`],
  };
  const response = await fast2sms.sendMessage(options);
  res.status(StatusCodes.OK).json({ res: "Success", data: response });
};

const mobileOTPVerify = async (req, res) => {
  const { ownerId } = req.user;
  const { otp } = req.body;
  if (!otp) {
    throw new BadRequestError("Please provide OTP");
  }
  const owner = await Owner.findOne({ _id: ownerId });
  if (owner.phoneotp != Number(otp)) {
    throw new BadRequestError("Please provide valid OTP");
  }
  const ownerx = await Owner.findOneAndUpdate(
    { _id: ownerId },
    { phoneVerified: true },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(StatusCodes.OK).json({ res: "Success" });
};

module.exports = {
  registerOwner,
  forgotPasswordOwner,
  loginOwner,
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
};
