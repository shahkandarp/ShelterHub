const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PlacesSchema = new mongoose.Schema({
  cityId:{
    type:mongoose.Types.ObjectId,
    ref:"City"
  },
  place:{
    type:[Object],
    default:[]
  }

});


module.exports = mongoose.model("Places", PlacesSchema);
