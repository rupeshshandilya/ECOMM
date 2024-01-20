const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const user = require("./controller/user")
const cors = require("cors")


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static("uploads"));
app.use(cors());


/* ============================== CONFIG ============================= */
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// function errorHandler (err, req, res, next) {
//   res.status(500)
//   res.render('error', { error: err })
// }


/* ============================== FOR ERRORHANDLING ============================= */
app.use(ErrorHandler)


app.use("/api/v2/user",user)

module.exports = app;
