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
};
