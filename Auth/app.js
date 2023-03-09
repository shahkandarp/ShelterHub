require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const multer = require("multer");

const express = require("express");
const app = express();
const UserMiddleware = require('./middleware/authentication_user')

//connectDB
const connectDB = require("./db/connect");

//middleware
app.use(express.static(`${__dirname}/public`));

// routers
const OwnerForgotPasswordRouter = require("./routes/OwnerForgotPasswordRouter");
const OwnerLoginRouter = require("./routes/OwnerLoginRouter");
const OwnerRegisterRouter = require("./routes/OwnerRegisterRouter");
const UserForgotPasswordRouter = require("./routes/UserForgotPasswordRouter");
const UserLoginRouter = require("./routes/UserLoginRouter");
const UserRegisterRouter = require("./routes/UserRegisterRouter");
const UserMobileValidationRouter = require('./routes/UserMobileValidationRoutes')


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

//routes user
app.use("/api/v1/user/login", UserLoginRouter);
app.use("/api/v1/user/register", UserRegisterRouter);
app.use("/api/v1/user/forgotpassword", UserForgotPasswordRouter);

//routes admin
app.use("/api/v1/owner/login", OwnerLoginRouter);
app.use("/api/v1/owner/forgotpassword", OwnerForgotPasswordRouter);
app.use("/api/v1/owner/register", OwnerRegisterRouter);

app.use('/api/v1/userverification',UserMiddleware,UserMobileValidationRouter)

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

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
