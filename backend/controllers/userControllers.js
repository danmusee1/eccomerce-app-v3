const ErrorHandler = require("../utils/errorhandler");
const catchasyncErrors= require("../middleware/catchAsyncErrors");
const User= require("../models/userModel");
const userModel = require("../models/userModel");

//register a user
exports.registerUser=catchasyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user= await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicture1"
        },
    });
    res.status(201).json({
        success:true,
        user,
    })
})