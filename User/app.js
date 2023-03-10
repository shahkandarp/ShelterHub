require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const express = require("express");
const app = express();
const Owner = require('./models/Owner')
const Room = require('./models/Room')
const OwnerMiddleware = require('./middleware/authentication_owner')
const multer = require("multer");
const {
  ref,
  uploadBytes,
  listAll,
  deleteObject,
} = require("firebase/storage");
const storage = require("./firebase");
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });


//connectDB
const connectDB = require("./db/connect");

//middleware
app.use(express.static(`${__dirname}/public`));

// routers
const userRouter = require("./routes/User");
const ownerRouter = require('./routes/Owner');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routes user
app.use("/api/v1/user", userRouter);
//routes owner
app.use("/api/v1/owner",ownerRouter);

//images/videos routes
app.post("/api/v1/addownerphoto",OwnerMiddleware, upload.single("pic"), async (req, res) => {
  const {ownerId} = req.user
  if(!ownerId){
    throw new BadRequestError("Please provide Owner ID");
  }
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  const snapshot = await uploadBytes(imageRef, file.buffer, metatype)
  const ownerx = await Owner.findOne({_id:ownerId})
  ownerx.photos.push(`https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`)
  const owner = await Owner.findOneAndUpdate({_id:ownerId},ownerx,{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:owner})
});

app.post("/api/v1/addownervideo",OwnerMiddleware, upload.single("pic"), async (req, res) => {
  const {ownerId} = req.user
  if(!ownerId){
    throw new BadRequestError("Please provide Owner ID");
  }
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  const snapshot = await uploadBytes(imageRef, file.buffer, metatype)
  const ownerx = await Owner.findOne({_id:ownerId})
  ownerx.videos.push(`https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`)
  const owner = await Owner.findOneAndUpdate({_id:ownerId},ownerx,{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:owner})
});

app.post("/api/v1/addroomphoto/:rid",OwnerMiddleware, upload.single("pic"), async (req, res) => {
  const {ownerId} = req.user
  const {rid} = req.params
  if(!rid){
    throw new BadRequestError("Please provide Room ID");
  }
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  const snapshot = await uploadBytes(imageRef, file.buffer, metatype)
  const roomx = await Room.findOne({_id:rid})
  if(!roomx){
    throw new BadRequestError("Please provide Valid Room ID");
  }
  roomx.photos.push(`https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`)
  const room = await Room.findOneAndUpdate({_id:rid},roomx,{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:room})
});

app.post("/api/v1/addroomvideo/:rid",OwnerMiddleware, upload.single("pic"), async (req, res) => {
  const {ownerId} = req.user
  const {rid} = req.params
  if(!rid){
    throw new BadRequestError("Please provide Room ID");
  }
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  const snapshot = await uploadBytes(imageRef, file.buffer, metatype)
  const roomx = await Room.findOne({_id:rid})
  if(!roomx){
    throw new BadRequestError("Please provide Valid Room ID");
  }
  roomx.videos.push(`https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`)
  const room = await Room.findOneAndUpdate({_id:rid},roomx,{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:room})
});

app.post("/api/v1/addaddressproof",OwnerMiddleware, upload.single("pic"), async (req, res) => {
  const {ownerId} = req.user
  if(!ownerId){
    throw new BadRequestError("Please provide Owner ID");
  }
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  const snapshot = await uploadBytes(imageRef, file.buffer, metatype)
  // const ownerx = await Owner.findOne({_id:ownerId})
  const addressproof = `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`
  const owner = await Owner.findOneAndUpdate({_id:ownerId},{addressproof},{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:owner})
});

app.post("/api/v1/addaadharproof",OwnerMiddleware, upload.single("pic"), async (req, res) => {
  const {ownerId} = req.user
  if(!ownerId){
    throw new BadRequestError("Please provide Owner ID");
  }
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  const snapshot = await uploadBytes(imageRef, file.buffer, metatype)
  //const ownerx = await Owner.findOne({_id:ownerId})
  const aadhaarno = `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`
  const owner = await Owner.findOneAndUpdate({_id:ownerId},{aadhaarno},{ runValidators: true, new: true, setDefaultsOnInsert: true })
  res.status(StatusCodes.OK).json({res:'Success',data:owner})
});

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

//connecting to database
start();
