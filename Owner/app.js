require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("./errors/index");
const Owner = require('./models/Owner')
const Room = require('./models/Room')
// const multer = require("multer");
const {
  ref,
  uploadBytes,
  listAll,
  deleteObject,
} = require("firebase/storage");
const storage = require("./firebase");
// const Interest = require('./models/Interest')

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const multer = require("multer");

const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

//middleware
app.use(express.static(`${__dirname}/public`));

// routers
const OwnerRouter = require('./routes/Owner')

//Authentication Middleware
const OwnerMiddleware = require('./middleware/authentication_owner')


app.use(express.json());
app.set("trust proxy", 1);
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100,
//   })
// );
app.use(helmet());
app.use(cors());
app.use(xss());
// extra packages
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });
// const upload = multer({ storage: multerStorage })

// app.post('/createInterest',OwnerMiddleware,async(req,res) => {
//   req.body.ownerId = req.user.ownerId
//   const interest = await Interest.create(req.body)
//   res.status(StatusCodes.OK).json({res:'Success',data:interest})
// })

const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

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

//routes owner
app.use('/api/v1/owner',OwnerMiddleware,OwnerRouter)

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

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
