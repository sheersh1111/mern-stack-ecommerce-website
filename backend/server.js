const { Console } = require("console");
const app = require("./app");
const connectDatabase= require("./config/database")
const cors = require("cors")
const dotenv=require("dotenv")

const cloudinary=require("cloudinary");

//handling uncaught exception
process.on("ReferenceError",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to uncaught exception`);
    process.exit(1);
});

//config
    dotenv.config({path:"backend/config/config.env"});


// const productRoute = require("../backend/routes/productRoute")
//connecting to database 

connectDatabase();

cloudinary.config({

    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const server =app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
}) 

// console.log(youtube);

//unhandled promise rejection
// process.on("unhandledRejection",(err)=>{
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to unhandled promise rejection`);

//     server.close(()=>{
//         process.exit(1);
//     });

// });

