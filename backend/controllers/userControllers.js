const ErrorHandler = require("../utils/errorhandler");
const catchasyncErrors= require("../middleware/catchAsyncErrors");
const User= require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail= require("../utils/sendEmail")
const crypto= require("crypto")

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
    

//logout user
exports.logout = catchasyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });

  //Forgot Password

  exports.forgotPassword= catchasyncErrors(async(req,res,next)=>{
    const user= await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get(
        "host"
        )}/api/v1/password/reset/${resetToken}`;


        const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\nif you have not requested this email then, please ignore it
        
        REGARDS:::             #YOUNG CEO`;
        try{

            await sendEmail({
                email:user.email,
                subject:`Eccomerce Password Recovery`,
                message,

            });
            res.status(200).json({
                success:true,
                message:`Email sent to ${user.email} successfully`

            })



        }catch(error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({validateBeforeSave:false});

            return next(new ErrorHandler(error.message, 500))
        }

  });


// Reset Password
exports.resetPassword = catchasyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }
    
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
    
      await user.save();
    
      sendToken(user, 200, res);
    });