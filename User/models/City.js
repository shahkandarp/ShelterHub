const mongoose = require("mongoose");
require("dotenv").config();

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  }
  
});


module.exports = mongoose.model("City", CitySchema);
