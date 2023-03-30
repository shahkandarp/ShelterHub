const mongoose = require("mongoose");
require("dotenv").config();

const SuggestionSchema = new mongoose.Schema({
  ownerId:{
    type:mongoose.Types.ObjectId,
    ref:"Owner"
  }
});


module.exports = mongoose.model("Suggestion", SuggestionSchema);
