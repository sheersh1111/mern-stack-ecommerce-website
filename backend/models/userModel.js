// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const crypto=require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should habe more than 4 characters"],

    },
    email: {
        type: String,
        required: [true, "Please Enter Your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter your email"]
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        minLength: [8, "password should be greater than 8 cahracters"]
    },
    avatar: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//Compare Password
userSchema.methods.authenticate = async function (enteredPassword) {
    console.log("Inside model")
    console.log(this.password)
    console.log(enteredPassword)
    return await bcrypt.compare(enteredPassword, this.password)
};
//generating password reset token
userSchema.methods.getResetPasswordToken=function(){
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // hashind and adding to userSchema
    this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
};

module.exports = mongoose.model("User", userSchema)