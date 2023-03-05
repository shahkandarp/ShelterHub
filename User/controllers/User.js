const express = require("express");
const Owner = require("../models/Owner");
const Room = require("../models/Room");
const Interest = require("../models/Interest");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");

//pgs
const getSpecificPgs = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")
}
const getPGDetails = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")
}
const getNearbyPgs = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")
}
const getFilteredPgs = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")

}

//user
const getUserDetails = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")

}
const updateUserDetails = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")

}
const validateOtp = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")
}
const changeUserPassword = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")

}

//interests
const getCurrentInterests = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")

}
const createUserInterest = async(req,res)=>{
    res.status(StatusCodes.OK).send("hI")

}
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
