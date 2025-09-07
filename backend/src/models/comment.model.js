import mongoose, { Schema } from "mongoose";

const commentSchema= new mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    writtenBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Comment= mongoose.model("Comment",commentSchema)