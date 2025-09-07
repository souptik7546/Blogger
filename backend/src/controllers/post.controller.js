import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import APiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  //validate the user from current session
  //get the fields (title,description,isActive,featuredImage) from req.body
  //validate the fields
  //create the post
  //send response

  if (!req.user) {
    throw new APiError(
      400,
      "user login session has expired so please login again to create post",
    );
  }
  const { title, description, isActive } = req.body;
  const featuredImageLocalPath = req.file?.path;
  const featuredImage = await uploadOnCloudinary(featuredImageLocalPath);

  const createdPost = await Post.create({
    title,
    description,
    isActive,
    featuredImage: featuredImage?.url || "",
    createdBy: req.user?._id,
  });

  if (!createdPost) {
    throw new APiError(500, "error occured in backend while creating new post");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "new post created successfully", createdPost));
});

const updatePost = asyncHandler(async (req, res) => {
  //get the user from body (via verify jwt)
  //get the post id from params
  //check for tha validations (title ,description, isActive)
  //check if he has updated the image the update it as well
  //update the post in db
  //send res
  const { post } = req.params;
  const { title, description, isActive } = req.body;

  const previousPost = await Post.findById(post);

  if (!previousPost) {
    throw new APiError(400, "the post you are trying to update does not exist");
  }
  //   console.log("11111",req.user?._id);
  //   console.log("2222222",previousPost.createdBy);

  if (req.user?._id.toString() !== previousPost.createdBy.toString()) {
    throw new APiError(
      400,
      "this post was not created by you so you can't update this",
    );
  }

  const featuredImageLocalPath = req.file?.path;

  const featuredImage = await uploadOnCloudinary(featuredImageLocalPath);

  previousPost.title = title;
  previousPost.description = description;
  previousPost.isActive = isActive;
  if (featuredImage) {
    previousPost.featuredImage = featuredImage.url;
  }

  const updatedPost = await previousPost.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        "the post has been updated successfully",
        updatedPost,
      ),
    );
});

const getPost = asyncHandler(async (req, res) => {
  const { post } = req.params;
  const featuredPost = await Post.findById(post);

  if (!featuredPost) {
    throw new APiError(401, "this post is not available");
  }

  console.log(featuredPost);

  return res
    .status(200)
    .json(new ApiResponse(200, "post fetched successfully", featuredPost));
});

const deletePost = asyncHandler(async (req, res) => {
  //secured route
  //get the post id out of params
  //search for the post and check if it was created by the same user or not
  //delete the post and send the response

  const {post}=req.params
  const featuredPost= await Post.findById(post)


  if(!featuredPost){
    throw new APiError(400,"this post does not exists so you cant delete it")
  }


  if(req.user?._id.toString()!==featuredPost.createdBy.toString()){
    throw new APiError(400,"this post is not created by you so you can't delete it")
  }

  await Post.findByIdAndDelete(post)

  return res.status(209).json(new ApiResponse(209,"post deleted successfully",{}))


});

export { createPost, updatePost, getPost, deletePost };
