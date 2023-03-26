const mongoose = require("mongoose");
require("dotenv").config();

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  places:{
    type:[Object],
    default:[]
  },
  area:{
    type:[Object],
    default:[]
  },
  image:{
    type:String,
    required:[true,"Please provide image url"],
    default:""
  }
});


module.exports = mongoose.model("City", CitySchema);
