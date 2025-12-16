import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import APiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Like } from "../models/like.model.js";
import mongoose from "mongoose";

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

const deletePost = asyncHandler(async (req, res) => {
  //secured route
  //get the post id out of params
  //search for the post and check if it was created by the same user or not
  //delete the post and send the response

  const { post } = req.params;
  const featuredPost = await Post.findById(post);

  if (!featuredPost) {
    throw new APiError(400, "this post does not exists so you cant delete it");
  }

  if (req.user?._id.toString() !== featuredPost.createdBy.toString()) {
    throw new APiError(
      400,
      "this post is not created by you so you can't delete it",
    );
  }

  await Post.findByIdAndDelete(post);

  return res
    .status(209)
    .json(new ApiResponse(209, "post deleted successfully", {}));
});

const getPost = asyncHandler(async (req, res) => {
  const { post } = req.params;

  const searchedPost = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(post),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "likedTo",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
        pipeline: [
          {
            $project: {
              username: 1,
              _id: 1,
              fullname: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        commentCount: { $size: "$comments" },
        canUpdate: {
          $cond: {
            if: { $in: [req.user?.email, "$createdBy.email"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        featuredImage: 1,
        createdBy: 1,
        isActive: 1,
        likesCount: 1,
        likes:1,
        commentCount: 1,
        comments: 1,
        createdAt: 1,
        updatedAt: 1,
        canUpdate: 1,
      },
    },
  ]);

  if (searchedPost.length === 0) {
    throw new APiError(404, "the post dosent exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "post fetched successfully", searchedPost[0]));
});

const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.aggregate([
    {
      $match: {
        isActive: true,
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "likedTo",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        commentCount: { $size: "$comments" },
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        featuredImage: 1,
        createdBy: 1,
        likesCount: 1,
        commentCount: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  if (!allPosts) {
    throw new APiError(500, "error while fetching all posts");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "fetched all posts", allPosts));
});

const getTopPosts = asyncHandler(async (req, res) => {
  //make a lookups of all the posts and calculate the average likes
  //now make another lookup to get the posts whose likes count is more than the average

  const averageLikesArray = await Post.aggregate([
    {
      $group: {
        _id: null,
        averageLikes: {
          $avg: "$likesCount",
        },
      },
    },
  ]);

  const avgLikes = averageLikesArray[0].averageLikes;

  const topPosts = await Post.aggregate([
    {
      $match: {
        isActive: true,
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "likedTo",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
      },
    },
    {
      $match: {
        likesCount: { $gte: avgLikes },
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        featuredImage: 1,
        createdBy: 1,
        likesCount: 1,
        commentCount: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  if (!topPosts){
    throw new APiError(401,"error while fetching top posts")
  }

  return res
  .status(200)
  .json(new ApiResponse(200,"top posts fetched successfully",topPosts))
});
export { createPost, updatePost, getPost, deletePost, getAllPosts ,getTopPosts};
