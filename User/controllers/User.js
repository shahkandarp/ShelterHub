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
const fast2sms = require("fast-two-sms");
const bcrypt = require("bcryptjs");
const City = require("../models/City");
const Rating = require("../models/Rating");

//utility
function getCommonItems(array1, array2) {
  var common = []; // Initialize array to contain common items

  for (var i = 0; i < array1.length; i++) {
    for (var j = 0; j < array2.length; j++) {
      if (String(array1[i]._id) === String(array2[j]._id)) {
        // If item is present in both arrays
        common.push(array1[i]); // Push to common array
      }
    }
  }

  return common; // Return the common items
}
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

//authentication user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequestError("Please provide necessary credentials");
  }
  const userx = await User.findOne({ email: req.body.email });
  if (userx) {
    throw new BadRequestError("This Email already Exists");
  }
  if (req.body.password.length < 8) {
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

const loginUserByPhone = async (req, res) => {
  const { phoneno, password } = req.body;
  if (!phoneno || !password) {
    throw new BadRequestError("Please provide phone number and password");
  }
  const user = await User.findOne({ phoneno });
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

const sendUserOTP = async (req, res) => {
  const { userId } = req.user;
  var { phoneno } = req.body;
  if (!phoneno) {
    throw new BadRequestError("Please provide Phone Number");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  console.log(otp);
  const user = await User.findOneAndUpdate(
    { _id: userId },
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

const verifyUserOTP = async (req, res) => {
  const { userId } = req.user;
  const { otp } = req.body;
  if (!otp) {
    throw new BadRequestError("Please provide OTP");
  }
  const user = await User.findOne({ _id: userId });
  if (user.phoneotp != Number(otp)) {
    throw new BadRequestError("Please provide valid OTP");
  }
  res.status(StatusCodes.OK).json({ res: "Success" });
};

//pgs
const getPGDetails = async (req, res) => {
  const { pid } = req.params;
  const pg = await Owner.findOne({ _id: pid });
  if (!pg) {
    throw new BadRequestError("No PG with provided pg id!");
  } else {
    const rooms = await Room.find({ ownerId: pid });
    const views = pg.views + 1;
    if (pg.famousplacedistance.length == 0) {
      let distance_array = [];
      const city = await City.findOne({ name: pg.cityname });
      const places = city.places;
      for (let i = 0; i < places.length; i++) {
        const obj = {};
        const distance = calculateDistance(
          places[i].lat,
          pg.lat,
          places[i].lng,
          pg.lng
        );
        obj.name = places[i].name;
        obj.distance = distance;
        distance_array.push(obj);
      }
      let updated_pg = await Owner.findOneAndUpdate(
        { _id: pid },
        { views: views, famousplacedistance: distance_array },
        {
          new: true,
          runValidators: true,
        }
      );
      res
        .status(StatusCodes.OK)
        .json({ res: "success", data: { pg: updated_pg, rooms } });
    } else {
      let updated_pg = await Owner.findOneAndUpdate(
        { _id: pid },
        { views: views },
        {
          new: true,
          runValidators: true,
        }
      );
      res
        .status(StatusCodes.OK)
        .json({ res: "success", data: { pg: updated_pg, rooms } });
    }
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
      const pgs = await Owner.find({
        propertytitle: { $regex: search, $options: "i" },
      });
      res.status(StatusCodes.OK).json({ res: "success", data: pgs });
    }
    if (sort) {
      const pgs = await Owner.find({}).sort(sort);
      let nearby_pgs = await nearByPgs(user.lat, user.lng, pgs);
      res.status(StatusCodes.OK).json({ res: "success", data: nearby_pgs });
    }
  }
};
const getNearbyPgs = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ _id: uid });
  if (!user) {
    throw new NotFoundError("User does not exists!");
  } else {
    let nearby_pgs = await nearByPgs(user.lat, user.lng);
    res.status(StatusCodes.OK).json({ res: "success", data: nearby_pgs });
  }
};
const getFilteredPgs = async (req, res) => {
  let pg_obj = {}; //general pg/hostel amenities
  let room_obj = {}; //occupancy, attached bathrooms, price

  const {
    areaname,
    isAttached,
    isAC,
    isHotWater,
    isWIFI,
    typeofpg,
    isFemale,
    isMale,
    cityname,
    ratingFilters,
    priceFilters,
    occupancy,
    isCooler,
  } = req.body;

  //room
  if (isAttached) {
    room_obj.isAttached = isAttached;
  }
  if (isAC) {
    room_obj.isAC = isAC;
  }
  if (occupancy) {
    if (occupancy === "shared") {
      room_obj.occupancy = { $gt: 1 };
    } else {
      room_obj.occupancy = { $eq: 1 };
    }
  }
  if (priceFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = priceFilters.replace(
      regEx,
      (match) => `&${operatorMap[match]}&`
    );
    filters = filters.split(",").forEach((item) => {
      const [field1, op1, val1, field2, op2, val2] = item.split("&");
      room_obj[field1] = { [op1]: Number(val1), [op2]: Number(val2) };
    });
  }

  //pg
  if(areaname){
    pg_obj.areaname = areaname;
  }
  if (isHotWater) {
    pg_obj.isHotWater = isHotWater;
  }
  if (isCooler) {
    pg_obj.isCooler = isCooler;
  }
  if (isWIFI) {
    pg_obj.isWIFI = isWIFI;
  }
  if (typeofpg) {
    pg_obj.typeofpg = typeofpg;
  }
  if (isFemale) {
    pg_obj.isFemale = isFemale;
  }
  if (isMale) {
    pg_obj.isMale = isMale;
  }
  if (cityname) {
    pg_obj.cityname = { $regex: req.body.cityname, $options: "i" };
  }
  if (ratingFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = ratingFilters.replace(
      regEx,
      (match) => `&${operatorMap[match]}&`
    );
    filters = filters.split(",").forEach((item) => {
      const [field1, op1, val1, field2, op2, val2] = item.split("&");
      pg_obj[field1] = { [op1]: Number(val1), [op2]: Number(val2) };
    });
  }
  //get the pgs which satisfies general pg filters
  const pgs = await Owner.find(pg_obj);
  let data = [];
  for (let i = 0; i < pgs.length; i++) {
    let obj = {};
    if (Object.keys(room_obj).length == 0) {
      const rooms = await Room.find({ ownerId: pgs[i]._id });
      if (rooms.length == 0) {
        continue;
      }
      obj.pg = pgs[i];
      obj.rooms = rooms;
    } else {
      room_obj.ownerId = pgs[i]._id;
      const rooms = await Room.find(room_obj);
      if (rooms.length == 0) {
        continue;
      }
      obj.pg = pgs[i];
      obj.rooms = rooms;
    }
    data.push(obj);
  }
  res.status(StatusCodes.OK).json({ res: "success", nhits: data.length, data });
};
const addRating = async (req, res) => {
  let { uid, pid } = req.params;
  let { rating } = req.body;
  rating = Number(rating);
  const pg = await Owner.findOne({ _id: pid });
  let pg_rating = (
    (pg.ratings * pg.noofraters + rating) /
    (pg.noofraters + 1)
  ).toFixed(1);
  let raters = pg.noofraters + 1;
  const user_rating = await Rating.findOne({ userId: uid, ownerId: pid });
  if (!user_rating) {
    const update_pg = await Owner.findOneAndUpdate(
      { _id: pid },
      { ratings: pg_rating, noofraters: raters },
      { new: true, runValidators: true }
    );
    const new_rating = await Rating.create({
      userId: uid,
      ownerId: pid,
      rating: rating,
    });
    res.status(StatusCodes.OK).json({ res: "success", data: update_pg });
  } else {
    res
      .status(StatusCodes.OK)
      .json({ res: "failed", data: "user has already rated" });
  }
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
  let { otp } = req.body;
  const { email } = req.params;
  if (!otp) {
    throw new BadRequestError("Please provide otp in the body");
  } else {
    otp = Number(otp);
    const user = await User.findOne({ email: email });
    if (user.mailotp !== otp) {
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
  const { uid } = req.params;
  const interests = await Interest.find({ userId: uid });
  let response_array = [];
  for (let i = 0; i < interests.length; i++) {
    let obj = {};
    const owner = await Owner.findOne({ _id: interests[i].ownerId });
    const room = await Room.findOne({ _id: interests[i].roomId });
    obj.pg = owner;
    obj.room = room;
    response_array.push(obj);
  }
  res.status(StatusCodes.OK).json({ res: "success", data: response_array });
};
const createUserInterest = async (req, res) => {
  const { uid } = req.params;
  const { room } = req.body;
  const owner_room = await Room.findOne({ _id: room });
  const owner_id = owner_room.ownerId;
  const interest = await Interest.create({
    userId: uid,
    ownerId: owner_id,
    roomId: room,
  });
  res.status(StatusCodes.OK).json({ res: "success", data: interest });
};

//cities
const getCities = async (req, res) => {
  const { search } = req.query;
  const {name} = req.body;
  if(name){
    const city = await City.findOne({name:name});
    res.status(StatusCodes.OK).json({res:"success",data:city})

  }
  else{
    var cities = await City.find({});
    if (search) {
      cities = await City.find({ name: { $regex: search, $options: "i" } });
    }
    res.status(StatusCodes.OK).json({ res: "success", data: cities });

  }
};

module.exports = {
  loginUserByPhone,
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
  verifyUserOTP,
  getCities,
  addRating,
};
