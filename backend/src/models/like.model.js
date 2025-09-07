import mongoose, { Schema } from "mongoose";

const likeSchema= new mongoose.Schema({
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    likedTo:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Like= mongoose.model("Like",likeSchema)