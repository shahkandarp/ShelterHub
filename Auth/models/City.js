const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  }

});


module.exports = mongoose.model("City", CitySchema);
