const express = require('express')
const path = require('path')
const router = express.Router()
const {upload} = require('../multer')
const User = require('../model/user')
const ErrorHandler = require('../utils/ErrorHandler')
const fs = require("fs")


router.post("/create-user", upload.single("file"), async (req,res, next)=>{
    const {name,email,password} = req.body;
    const userEmail = await User.findOne({email});

    if(userEmail){
        //Stop Uploading picture if user already registered
        const filename = req.file.filename;
        const fielpath = `uploads/${filename}`;
        fs.unlink(fielpath, (err)=>{
            if(err){
                res.status(500).json({message: "Error in deleting file"});
            } else{
                res.json({message: "file deleted successfully"})
            }
        });
        return next(new ErrorHandler("User already exists",400))
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

    //uploading data to database
    const newUser = await User.create(user);
    res.status(201).json({
        success: true,
        newUser,
    })
})

module.exports = router;