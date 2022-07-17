const jwt= require("jsonwebtoken")
const getJWTToken = (id) =>{
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}
//creating token and saving in cookie
const sendToken =(user,statusCode,res) =>{
    const token=getJWTToken(user._id);
    //options for cookie
    const options={
        expiresIn:new Date(
            Date.now + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,

    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });
};
module.exports=sendToken;