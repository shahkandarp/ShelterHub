const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const RoomSchema = new mongoose.Schema({
  ownerId:{
    type:mongoose.Types.ObjectId,
    ref:"Owner"
  },
  title:{
    type:String,
    required:[true,'Please provide title']
  },
  isAC:{
    type:Boolean,
    default:false
  },
  isAttatched:{
    type:Boolean,
    default:false
  },
  occupancy:{
    type:Number,
    required:[true,'Please Provide Occupancy']
  },
  availablerooms:{
    type:Number,
    required:[true,'Please Provide Number of Available Rooms']
  },
  About:{
    type:String,
    default:""
  },
  photos:{
    type:[String],
    default:[]
  },
  videos:{
    type:[String],
    default:[]
  },
  price:{
    type:Number,
    required:[true,'Please Enter Valid Price']
  }

});

module.exports = mongoose.model("Room", RoomSchema);
