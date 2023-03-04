require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
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

//routes owner
app.use('/api/v1/owner',OwnerMiddleware,OwnerRouter)

// app.post('/createInterest',OwnerMiddleware,async(req,res) => {
//   req.body.ownerId = req.user.ownerId
//   const interest = await Interest.create(req.body)
//   res.status(StatusCodes.OK).json({res:'Success',data:interest})
// })

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
