import mongoose, { Schema } from "mongoose"

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
     description:{
        type:String,
        requied:true,
    },
    featuredImage:{
        type:String, //cloudinary url
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    isActive:{
        type:Boolean,
        default:true,
        required:true
    },
    likesCount:{
        type:Number,
        default:0
    },
    commentCount:{
        type:Number,
        default:0
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }]
},{timestamps:true})

export const Post= mongoose.model("Post",postSchema)