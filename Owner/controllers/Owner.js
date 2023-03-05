const express = require("express");
const Owner = require("../models/Owner");
const Room = require('../models/Room')
const Interest = require('../models/Interest')
const User = require('../models/User')
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs')
const fast2sms = require('fast-two-sms')

const ownerVerifyOTP = async (req,res) => {
  const {ownerId} = req.user
  const {otp} = req.body
  if(!otp){
    throw new BadRequestError("Please provide OTP");
  }
  const owner = await Owner.findOne({_id:ownerId})
  if(owner.mailotp != Number(otp)){
    throw new BadRequestError("Please provide valid OTP");
  }
  res.status(StatusCodes.OK).json({res:'Success'})
}

const changePassword = async (req,res) => {
  const {ownerId} = req.user
  var {password} = req.body
  if(!password){
    throw new BadRequestError("Please provide password");
  }
  if(password.length<6){
    throw new BadRequestError("Minimum length of password is 6");
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const owner = await Owner.findOneAndUpdate({_id:ownerId},{password},{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success'})
}

const updateOwner = async (req,res) => {
  const {ownerId} = req.user
  const owner = await Owner.findOneAndUpdate({_id:ownerId},req.body,{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:owner})
}

const displayOwner = async(req,res) => {
  const {ownerId} = req.user
  const owner = await Owner.findOne({_id:ownerId})
  res.status(StatusCodes.OK).json({res:'Success',data:owner})
}

const createRoom = async (req,res) => {
  const {ownerId} = req.user
  const {title,occupancy,availablerooms,price} = req.body
  if(!title || !occupancy || !availablerooms || !price){
    throw new BadRequestError("Please provide valid credentials");
  }
  req.body.ownerId = ownerId
  const room = await Room.create(req.body)
  res.status(StatusCodes.OK).json({res:'Success',data:room})
}

const displayAllRooms = async (req,res) => {
  const {ownerId} = req.user
  const rooms = await Room.find({ownerId}) 
  res.status(StatusCodes.OK).json({res:'Success',data:rooms})
}

const displayRoom = async (req,res) => {
  const {ownerId} = req.user
  const {rid} = req.params
  if(!rid){
    throw new BadRequestError("Please provide Room ID");
  }
  const room = await Room.findOne({_id:rid})
  if(!room){
    throw new BadRequestError("Please provide Valid Room ID");
  }
  res.status(StatusCodes.OK).json({res:'Success',data:room})
}

const updateRoom = async (req,res) => {
  const {ownerId} = req.user
  const {rid} = req.params
  if(!rid){
    throw new BadRequestError("Please provide Room ID");
  }
  const room = await Room.findOneAndUpdate({_id:rid},req.body,{ runValidators: true, new: true, setDefaultsOnInsert: true })
  if(!room){
    throw new BadRequestError("Please provide Valid Room ID");
  }
  res.status(StatusCodes.OK).json({res:'Success',data:room})
}

const showInterests = async (req,res) => {
  const {ownerId} = req.user
  const interests = await Interest.find({ownerId}) 
  const arr = []
  var i=0
  interests.forEach((interest)=>{
    const d = new Date()
    const todayMonth = d.getMonth()+1;
    const todayYear = d.getFullYear();
    var interestDate = new Date(interest.createdAt)
    const interestMonth = interestDate.getMonth()+1
    const interestYear = interestDate.getFullYear()
    if(todayMonth == interestMonth && todayYear==interestYear){
      arr[i] = interest
      ++i
    }
  })
  const arr1=[]
  var j=0
  for(i=0;i<arr.length;++i){
    var obj={}
    const user = await User.findOne({_id:arr[i].userId})
    obj.username = user.name
    obj.userphoneno = user.phoneno
    obj.useremail = user.email
    const room = await Room.findOne({_id:arr[i].roomId})
    obj.roomtitle = room.title
    obj.createdAt = arr[i].createdAt
    arr1[j] = obj
    ++j
  }
  res.status(StatusCodes.OK).json({res:'Success',data:arr1})
}

const mobileOTPSend = async (req,res) => {
  const {ownerId} = req.user
  var {phoneno} = req.body
  if(!phoneno){
    throw new BadRequestError("Please provide Phone Number");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  console.log(otp)
  const owner = await Owner.findOneAndUpdate({_id:ownerId},{phoneotp:otp,phoneno},{ runValidators: true, new: true, setDefaultsOnInsert: true })
  var options = {authorization : process.env.API_KEY , message : `${otp} is your verification code for Nivaas, valid for 15 min. Please do not share with others.` ,  numbers : [
    `${phoneno}`]} 
  const response = await fast2sms.sendMessage(options)
  res.status(StatusCodes.OK).json({res:'Success',data:response})
} 

const mobileOTPVerify = async (req,res) => {
  const {ownerId} = req.user
  const {otp} = req.body
  if(!otp){
    throw new BadRequestError("Please provide OTP");
  }
  const owner = await Owner.findOne({_id:ownerId})
  if(owner.phoneotp != Number(otp)){
    throw new BadRequestError("Please provide valid OTP");
  }
  const ownerx = await Owner.findOneAndUpdate({_id:ownerId},{phoneVerified:true},{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success'})
}

module.exports = {
  ownerVerifyOTP,changePassword,updateOwner,displayOwner,createRoom,displayAllRooms,displayRoom,updateRoom,showInterests,mobileOTPSend,mobileOTPVerify
};
