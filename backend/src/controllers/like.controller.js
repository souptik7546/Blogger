import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";

const likePost = asyncHandler(async (req, res) => {
  //get the post id from params and validate the post
  //verify the user current session
  //create a doc and send res
 const { post } = req.params;

  const existingLike = await Like.findOne({
    likedBy: req.user._id,
    likedTo: post,
  });

  if(existingLike){
    throw new ApiError(400,"already liked the post")
  }

 
  if (!post) {
    throw new ApiError(400, "post dose not exist");
  }
  const like = await Like.create({
    likedBy: req.user._id,
    likedTo: post,
  });
  
  

  return res.status(201).json(new ApiResponse(201, "like created", like));
});

const removeLike = asyncHandler(
  asyncHandler(async (req, res) => {
    //get the user id from session and post id from params
    //search for the like if it is present or not
    //delete it and send response
    const { post } = req.params;
    const like = await Like.findOne({
      likedBy: req.user._id,
      likedTo: post,
    });

    if (!like) {
      throw new ApiError(400, "you havent liked this post");
    }

    await Like.findByIdAndDelete(like._id);

    return res.status(200).json(new ApiResponse(200, "like removed", {}));
  }),
);

const isLiked= asyncHandler(async (req,res)=>{
  const {post}=req.params;
  const like= await Like.findOne({
    likedBy:req.user?._id,
    likedTo:post
  })
  

    if(!like){
      return res.status(200).json(new ApiResponse(200,"no like",{isLiked:false}))
    }

    
    return res.status(202).json(new ApiResponse(202,"like exists",{isLiked:true,like}))
})

export { likePost, removeLike ,isLiked};
