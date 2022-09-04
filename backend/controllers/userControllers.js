const ErrorHandler = require("../utils/errorhandler");
const catchasyncErrors= require("../middleware/catchAsyncErrors");
const User= require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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

    sendToken(user,201,res);
});

//Login User

exports.loginUser=catchasyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
     
    //cheking is user has given both the password and email
    if(!email || !password){
        return next(new ErrorHandler("please enter Email & password",400))
    }
    const user= await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("invalid email or password",401));
    }

    const isPasswordMatched = user.comparePassword(password);


    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or password",401));
    }

    sendToken(user,200,res);



})
    