const express =require("express");
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser");
const fileUpload= require("express-fileupload");
const path = require("path")
const dotenv=require("dotenv");
const errorMiddleware =require("./middleware/error");
const app = express();

dotenv.config({path:"backend/config/config.env"});
app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());



//route imports
const user=require("./routes/userRoute")
const product =require("./routes/productRoute");
const order = require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


//middle ware for errors
app.use(errorMiddleware);

module.exports = app