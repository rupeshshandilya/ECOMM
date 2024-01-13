const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const user = require("./controller/user")


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static("uploads"));


/* ============================== CONFIG ============================= */
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

/* ============================== FOR ERRORHANDLING ============================= */
app.use(ErrorHandler)


app.use("api/v2/user",user)

module.exports = app;
