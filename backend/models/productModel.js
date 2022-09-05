const mongoose= require("mongoose");

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product Description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product Price"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter product Category"],
        
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxlength:[4,"stock cannot exeed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    revews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comments:{
                type:String,
                required:true
            }
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Product",productSchema)