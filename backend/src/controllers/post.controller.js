import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import APiError from "../utils/apiError.js";

const createPost= asyncHandler(async(req,res)=>{
//validate the user from current session
//get the fields (title,description,isActive,featuredImage) from req.body
//validate the fields
//create the post
//send response

})

const updatePost= asyncHandler(async(req,res)=>{
    
})

const getPost= asyncHandler(async(req,res)=>{

})

const deletePost=asyncHandler(async(req,res)=>{

})

export {createPost,updatePost,getPost,deletePost}