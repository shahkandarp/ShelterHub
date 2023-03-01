const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  phoneno:{
    type: String,
    required: [true, "Please provide password"],
  },
  lat:{
    type:mongoose.Decimal128,
    default:0
  },
  lng:{
    type:mongoose.Decimal128,
    default:0
  },
  phoneotp: {
    type: Number,
    default: 0,
  },
  mailotp: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  aadhaarno:{
    type:String,
    required:[true,"Please Provide Aadhar Number"],
    match: [
      /^[0-9]{12}$/,
      "Please provide valid Aadhar",
    ]
  },
  addressproof:{
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
  Rules:{
    type:String,
    default:""
  },
  About:{
    type:String,
    default:""
  },
  interestedusers:{
    type:Number,
    default:0
  },
  views:{
    type:Number,
    default:0
  },
  ratings:{
    type:mongoose.Decimal128,
    default:0
  },
  noofraters:{
    type:Number,
    default:0
  },
  cityId:{
    type:mongoose.Types.ObjectId,
    ref:"City"
  },
  famousplacedistance:{
    type:[Object],
    default:[]
  },
  isMale:{
    type:Boolean,
    default:false
  },
  isFemale:{
    type:Boolean,
    default:false
  },
  isAC:{
    type:Boolean,
    default:false
  },
  isCooler:{
    type:Boolean,
    default:false
  },
  isMess:{
    type:Boolean,
    default:false
  },
  typeofpg:{
    type:String,
    enum:['PG','FAMILYROOMS','HOSTEL'],
    required:[true,'Please Provide Type of PG']
  },
  isWIFI:{
    type:Boolean,
    default:false
  },
  isHotWater:{
    type:Boolean,
    default:false
  }
});

OwnerSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

OwnerSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET_OWNER,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
OwnerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Owner", OwnerSchema);
