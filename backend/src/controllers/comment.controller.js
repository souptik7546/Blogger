import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/apiError.js";
import {Post} from "../models/post.model.js"
import { Comment } from "../models/comment.model.js";

const createComment = asyncHandler(async (req, res) => {
    //verify the user before
    //check if post exists
    //validate the comment
    //create comment
    //send respponse

    const {comment,postId}= req.body
    const post= await Post.findById(postId)

    if(!comment){
        throw new ApiError(400,"comment message is missing")
    }

    if(!post){
        throw new ApiError(404,"post does not exist")
    }

    const createdComment= await Comment.create({
        message:comment,
        post:postId,
        writtenBy:req.user._id
    })

    if(!createdComment){
        throw new ApiError(500,"error at backend while posting the comment")
    }

    return res.status(201).json(new ApiResponse(201,"your comment was successfully posted",createComment))



});

const updateComment = asyncHandler(async (req, res) => {
    //verify if user is logged in
    //get the comment id from the params
    //check if the writer of the comment is this logged in session user
    //get the updated comment from req body
    //update the comment
    //send res

    const {commentId}=req.params
    const {newComment}=req.body
    if(!newComment){
        throw new ApiError(400,"comment cannot be empty")
    }
    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(400,"the comment does not exist")
    }

    if(comment.writtenBy.toString()!== req.user._id.toString()){
        throw new ApiError(400,"you are not the owner of this content so you cant update")
    }
    comment.message=newComment

    const updatedComment=await comment.save({validateBeforeSave:false})
    if(!updateComment){
        throw new ApiError(503,"error while updating the comment in backend")
    }

    return res.status(200).json(new ApiResponse(201,"comment has been edited successfully",updateComment))
});

const deleteComment = asyncHandler(async (req, res) => {
    //get the comment id from the params
    //validate the comment with the current logged in session user
    //delete the comment
    //send response

    const {commentId}=req.params
    const comment =await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(402,"the comment does not exist")
    }
    if(comment.writtenBy.toString()!==req.user._id.toString()){
        throw new ApiError(404,"this comment was not creaed by you so you cant delete it")
    }

    await Comment.findByIdAndDelete(commentId)

    return res.status(200).json(new ApiResponse(209,"comment deleted successfully",{}))

});

export { createComment, updateComment, deleteComment };
