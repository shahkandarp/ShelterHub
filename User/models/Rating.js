const mongoose = require("mongoose");
require("dotenv").config();

const RatingSchema = new mongoose.Schema({
  ownerId:{
    type:mongoose.Types.ObjectId,
    ref:"Owner"
  },
  rating:{
    type:mongoose.Decimal128,
    default:0
  },
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
},{timestamps:true});


module.exports = mongoose.model("Rating", RatingSchema);
