const mongoose = require("mongoose");
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
