const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Product = require("../models/productModel");
const cloudinary = require("cloudinary");


const getJWTToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}
//Register a User
exports.registerUser = catchAsyncerrors(async (req, res, next) => {
    console.log("fileupload")
    let myCloud="";
if(req.body.avatar){
        myCloud = await cloudinary.v2.uploader.upload_large(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    })}

    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });
    sendToken(user, 201, res);
})
//Login User
exports.loginUser = async(req, res,next) => {
    const { email, password } = req.body;
    //checking if user has given password and email both
    console.log(email, password)
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & Password", 400));
    }
   const user=  await User.findOne({ email: req.body.email })
        if (user) {
            const isPasswordMatched = await user.authenticate(req.body.password);
            console.log(isPasswordMatched);
            if (!isPasswordMatched) {
                return next(new ErrorHandler("Invalid Emailid or Password", 401));
            }
            sendToken(user, 200, res);
        }
        else {
            return next(new ErrorHandler("Invalid Email or password"),400);
        }
    
};
//Logout User
exports.logout = catchAsyncerrors(async (req, res, next) => {
    res.cookie("token", null, {
        expiresIn: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});

// forgot password
exports.forgotPassword = catchAsyncerrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    //Get reset password Token
    const resetToken = user.getResetPasswordToken();
    console.log(resetToken);
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have not requested this email,then please ignore`;
    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password recovery`,
            message,

        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }

});
//Reset password
exports.resetPassword = catchAsyncerrors(async (req, res, next) => {
    // creating token hash
    //  console.log(resetToken);
    
    console.log("reset ke andar")
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPassswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or expired", 400));
    }
    console.log(req.body.password, req.body.confirmPassword);
    if (req.body.password == req.body.confirmPassword) {
        console.log("Match ho gya madharchod")
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        sendToken(user, 200, res);
        return res.status(200).json({message: "Password changed success"})
    }
    else{return next(new ErrorHandler("Password does not match", 400))};
})
//Get User Details
exports.getUserDetails = catchAsyncerrors(async(req,res,next)=>{
    const user= await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,

    });
});
//Update User Password
exports.updatePassword = catchAsyncerrors(async(req,res,next)=>{
    const user= await User.findById(req.user.id);
    const isPasswordMatched = await user.authenticate(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("password does not match confirm password", 400))
    }
    user.password= req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
});
//user profile update
exports.updateProfile = catchAsyncerrors(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    };
    if(req.body.avatar!==""){
        const user=await User.findById(req.user.id);
        const imageid= user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageid);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        });
        newUserData.avatar = {
            public_id:myCloud.public_id,
            url:myCloud.url,
        }
    }
   
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true
    });

});
//Get all users(admin)
exports.getAllUser = catchAsyncerrors(async(req,res,next)=>{
    const users= await User.find();
    res.status(200).json({
        success:true,
        users,
    });

});
//Get single User(admin)
exports.getSingleuser =catchAsyncerrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`user does not exist with id:${req.params.id}`));
    }
res.status(200).json({
    success:true,
    user,
})
})
//update user role --admin
exports.updateRole = catchAsyncerrors(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    };
    //we will add add cloudinary later
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
    });
});
// delete user --admin
exports.deleteUser = catchAsyncerrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("User does not exist",404));
    }
    const imageid= user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageid);
    await user.remove();
    res.status(200).json({
        success:true,
        message:"user deleted successfully"

    });
});
// create new review or update review
exports.createProductReviview= catchAsyncerrors(async(req,res,next)=>{
    const {rating,comment,productId} = req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    };
    const product = await Product.findById(productId);
    
    // const isReviewed = product.reviews.find(
    //     (rev)=>rev.user.toString()===req.user._id.toString()
    // );
    let isReviewed=0;
   
    let len=product.reviews.length;
    console.log("yha nhi aya")
    for (let i=0;i<len;i++){
        if(product.reviews[i].user==req.user._id){
            isReviewed+=1;
            break;
        }
    }

    
   
    if(isReviewed>0){
        product.reviews[i].reating=rating;
        product.reviews[i].comment=comment;
    }
    else{
        product.reviews.push(review);
    }
    let avg=0;
    product.ratings = 
        product.reviews.forEach((rev)=>{
            avg+=rev.rating;
        }) 
        product.ratings= avg/product.reviews.length;

        await product.save({validateBeforeSave:false});
        res.status(200).json({
            success:true,

        })
    })