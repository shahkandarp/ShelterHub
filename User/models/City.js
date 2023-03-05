const mongoose = require("mongoose");
require("dotenv").config();

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  place:{
    type:[Object],
    default:[]
  }
});


module.exports = mongoose.model("City", CitySchema);
