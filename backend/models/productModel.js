const mongoose= require("mongoose");
const { stringify } = require("querystring");
const productSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product description"],
    },
    price:{
        type:Number,
        required:[true,"Please enter product Price"],
        maxLength:[8,"price cannot exceed 8 characters"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
    
    }
    ,
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }],
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
    },
    numofReviews:{
        type:Number,
        default:0,

    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
        
        },
        
        name:{
            type:String
        },
        rating:{
            type:Number
        },
        comment:{
            type:String
        },
    createdAt:{
        type:Date,
        default:Date.now,
    }
    }]  

})
module.exports= mongoose.model("Product",productSchema);