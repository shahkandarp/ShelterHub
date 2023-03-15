const express = require("express");
const app = express();

//dependencies
require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const { ref, uploadBytes, deleteObject } = require("firebase/storage");
const storage = require("./firebase");
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

// extra security packages
const helmet = require("helmet");
const cors = require("cors");

//models
const Owner = require("./models/Owner");
const Room = require("./models/Room");

//connectDB
const connectDB = require("./db/connect");

// routers
const userRouter = require("./routes/User");
const ownerRouter = require("./routes/Owner");

//middleware
const OwnerMiddleware = require("./middleware/authentication_owner");
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(helmet());
app.use(cors());

//routes user
app.use("/api/v1/user", userRouter);
//routes owner
app.use("/api/v1/owner", ownerRouter);

//images/videos routes
app.post(
  "/api/v1/addownerphoto",
  OwnerMiddleware,
  upload.single("pic"),
  async (req, res) => {
    const { ownerId } = req.user;
    if (!ownerId) {
      throw new BadRequestError("Please provide Owner ID");
    }
    const file = req.file;
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
    const ownerx = await Owner.findOne({ _id: ownerId });
    var obj = {
      name: snapshot.ref._location.path_,
      uri: `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`,
    };
    ownerx.photos.push(obj);
    const owner = await Owner.findOneAndUpdate({ _id: ownerId }, ownerx, {
      runValidators: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    res.status(StatusCodes.OK).json({ res: "Success", data: owner });
  }
);
app.delete("/api/v1/deleteownerphoto", OwnerMiddleware, async (req, res) => {
  const { name } = req.body;
  const { ownerId } = req.user;
  const deleteRef = ref(storage, name);
  const resp = await deleteObject(deleteRef);
  const owner = await Owner.findOne({ _id: ownerId });
  let photo = owner.photos.filter((own) => {
    return own.name != name;
  });
  const ownerx = await Owner.findOneAndUpdate(
    { _id: ownerId },
    { photos: photo },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(StatusCodes.OK).json({ res: "Success", data: ownerx });
});

app.post(
  "/api/v1/addownervideo",
  OwnerMiddleware,
  upload.single("pic"),
  async (req, res) => {
    const { ownerId } = req.user;
    if (!ownerId) {
      throw new BadRequestError("Please provide Owner ID");
    }
    const file = req.file;
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
    const ownerx = await Owner.findOne({ _id: ownerId });
    var obj = {
      name: snapshot.ref._location.path_,
      uri: `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`,
    };
    ownerx.videos.push(obj);
    const owner = await Owner.findOneAndUpdate({ _id: ownerId }, ownerx, {
      runValidators: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    res.status(StatusCodes.OK).json({ res: "Success", data: owner });
  }
);
app.delete("/api/v1/deleteownervideo", OwnerMiddleware, async (req, res) => {
  const { name } = req.body;
  const { ownerId } = req.user;
  const deleteRef = ref(storage, name);
  const resp = await deleteObject(deleteRef);
  const owner = await Owner.findOne({ _id: ownerId });
  let video = owner.videos.filter((own) => {
    return own.name != name;
  });
  const ownerx = await Owner.findOneAndUpdate(
    { _id: ownerId },
    { videos: video },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(StatusCodes.OK).json({ res: "Success", data: ownerx });
});

app.post(
  "/api/v1/addroomphoto/:rid",
  OwnerMiddleware,
  upload.single("pic"),
  async (req, res) => {
    const { ownerId } = req.user;
    const { rid } = req.params;
    if (!rid) {
      throw new BadRequestError("Please provide Room ID");
    }
    const file = req.file;
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
    const roomx = await Room.findOne({ _id: rid });
    if (!roomx) {
      throw new BadRequestError("Please provide Valid Room ID");
    }
    var obj = {
      name: snapshot.ref._location.path_,
      uri: `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`,
    };
    roomx.photos.push(obj);
    const room = await Room.findOneAndUpdate({ _id: rid }, roomx, {
      runValidators: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    res.status(StatusCodes.OK).json({ res: "Success", data: room });
  }
);

app.delete(
  "/api/v1/deleteroomphoto/:rid",
  OwnerMiddleware,
  async (req, res) => {
    const { name } = req.body;
    const { rid } = req.params;
    if (!rid) {
      throw new BadRequestError("Please provide Room ID");
    }

    const deleteRef = ref(storage, name);
    const resp = await deleteObject(deleteRef);
    const room = await Room.findOne({ _id: rid });
    let photo = room.photos.filter((own) => {
      return own.name != name;
    });
    const roomx = await Room.findOneAndUpdate(
      { _id: rid },
      { photos: photo },
      { runValidators: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(StatusCodes.OK).json({ res: "Success", data: roomx });
  }
);

app.post(
  "/api/v1/addroomvideo/:rid",
  OwnerMiddleware,
  upload.single("pic"),
  async (req, res) => {
    const { ownerId } = req.user;
    const { rid } = req.params;
    if (!rid) {
      throw new BadRequestError("Please provide Room ID");
    }
    const file = req.file;
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
    const roomx = await Room.findOne({ _id: rid });
    if (!roomx) {
      throw new BadRequestError("Please provide Valid Room ID");
    }
    var obj = {
      name: snapshot.ref._location.path_,
      uri: `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`,
    };
    roomx.videos.push(obj);
    const room = await Room.findOneAndUpdate({ _id: rid }, roomx, {
      runValidators: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    res.status(StatusCodes.OK).json({ res: "Success", data: room });
  }
);
app.delete("/api/v1/deleteroomvideo", OwnerMiddleware, async (req, res) => {
  const { name } = req.body;
  const { rid } = req.params;
  if (!rid) {
    throw new BadRequestError("Please provide Room ID");
  }

  const deleteRef = ref(storage, name);
  const resp = await deleteObject(deleteRef);
  const room = await Room.findOne({ _id: rid });
  let video = room.videos.filter((own) => {
    return own.name != name;
  });
  const roomx = await Room.findOneAndUpdate(
    { _id: rid },
    { videos: video },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(StatusCodes.OK).json({ res: "Success", data: roomx });
});

app.post(
  "/api/v1/addaddressproof",
  OwnerMiddleware,
  upload.single("pic"),
  async (req, res) => {
    const { ownerId } = req.user;
    if (!ownerId) {
      throw new BadRequestError("Please provide Owner ID");
    }
    const file = req.file;
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
    var obj = {
      name: snapshot.ref._location.path_,
      uri: `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`,
    };
    const owner = await Owner.findOneAndUpdate(
      { _id: ownerId },
      { addressproof: obj },
      { runValidators: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(StatusCodes.OK).json({ res: "Success", data: owner });
  }
);
app.delete("/api/v1/deleteaddressproof", OwnerMiddleware, async (req, res) => {
  const { name } = req.body;
  const { ownerId } = req.user;
  if (!ownerId) {
    throw new BadRequestError("Please provide Owner ID");
  }
  const deleteRef = ref(storage, name);
  const resp = await deleteObject(deleteRef);
  const ownerx = await Owner.findOneAndUpdate(
    { _id: ownerId },
    { addressproof: {} },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(StatusCodes.OK).json({ res: "Success", data: ownerx });
});
app.post(
  "/api/v1/addaadharproof",
  OwnerMiddleware,
  upload.single("pic"),
  async (req, res) => {
    const { ownerId } = req.user;
    if (!ownerId) {
      throw new BadRequestError("Please provide Owner ID");
    }
    const file = req.file;
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
    var obj = {
      name: snapshot.ref._location.path_,
      uri: `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path_}?alt=media`,
    };
    const owner = await Owner.findOneAndUpdate(
      { _id: ownerId },
      { aadhaarno: obj },
      { runValidators: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(StatusCodes.OK).json({ res: "Success", data: owner });
  }
);
app.delete("/api/v1/deleteaadharproof", OwnerMiddleware, async (req, res) => {
  const { name } = req.body;
  const { ownerId } = req.user;
  if (!ownerId) {
    throw new BadRequestError("Please provide Owner ID");
  }
  const deleteRef = ref(storage, name);
  const resp = await deleteObject(deleteRef);
  const ownerx = await Owner.findOneAndUpdate(
    { _id: ownerId },
    { aadhaarno: {} },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(StatusCodes.OK).json({ res: "Success", data: ownerx });
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
