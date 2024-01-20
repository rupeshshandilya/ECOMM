const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require('../middleware/catchAsyncError')
const sendToken = require('../utils/jwtToken');

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      //Stop Uploading picture if user already registered
      const filename = req.file.filename;
      const fielpath = `uploads/${filename}`;
      fs.unlink(fielpath, (err) => {
        if (err) {
          res.status(500).json({ message: "Error in deleting file" });
        } 
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    //if user not exist
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    // uploading data to database
    // const newUser = await User.create(user);
    // res.status(201).json({
    //     success: true,
    //     newUser,
    // });
    const activationToken = createActivationToken(user);
    console.log(activationToken);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        //after 5min user can't verify mail 
        expiresIn: "5m",
    })
}

//activate token
router.post("/activation", catchAsyncErrors(async(req,res,next) => {
  try {
    const {activation_token} = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if(!newUser){
      return next(new ErrorHandler("Invalid Token", 400));
    }

    const {name, email, password, avatar} = newUser;

    //to check wether user already exist or not
    let user = await User.findOne({email});
    if(user){
      return next(new ErrorHandler("User Already Exist",400))
    }

    user = await User.create({
      name,
      email,
      password,
      avatar
    })

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500)); 
  }
}))

module.exports = router;
