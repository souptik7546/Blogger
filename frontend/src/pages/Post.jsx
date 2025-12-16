import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import postService from "../service/post.service";
import { LikePostBtn } from "../components/index";

function Post() {
  const [Post, setPost] = useState(null);
  const navigate = useNavigate();
  const { post } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    if (post) {
      postService.getPost(post).then((data) => {
        setPost(data);
        if (data.createdBy[0]._id === userData._id) {
          setIsAuthor(true);
        } else {
          setIsAuthor(false);
        }
      });
    } else {
      navigate("/");
    }
  }, []);

  const deletePost = () => {
    //check foor author again for security

    postService
      .deletePost(post)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // in the get post we have the likes count and comments count fields display them
  //add the feature of add like and add comment
  return Post ? (
    <div className="m-12 bg-gray-600 p-12 rounded-3xl">
  <Container>

    {/* Image section */}
    <div className="w-full flex justify-center mb-8 relative border border-gray-400/30 rounded-2xl p-3 bg-gray-500/30">
      <img
        src={Post.featuredImage}
        alt={Post.title}
        className="rounded-xl  object-cover w-full"
      />

      {isAuthor && (
        <div className="absolute right-6 top-6 flex gap-2">
          <Link to={`/edit-post/${Post._id}`}>
            <Button bgColor="bg-green-500" className="shadow-md">
              Edit
            </Button>
          </Link>
          <Button bgColor="bg-red-500" onClick={deletePost} className="shadow-md">
            Delete
          </Button>
        </div>
      )}
    </div>

    {/* Interaction row */}
    {Post && (
      <div className="mb-10 flex items-center justify-between">
        <LikePostBtn post={Post} />
        {/* Placeholder for future actions (views, comments, share) */}
        <span className="text-sm text-gray-200/70">
          {/* intentionally empty for future extension */}
        </span>
      </div>
    )}

    {/* Title */}
    <div className="w-full mb-8 text-white">
      <span className="block text-sm uppercase tracking-wide text-gray-300 mb-1">
        Title
      </span>
      <h1 className="text-4xl font-bold leading-tight">
        {Post.title}
      </h1>
    </div>

    {/* Divider */}
    <div className="h-px w-full bg-gray-400/30 mb-8" />

    {/* Description */}
    <span className="block text-sm uppercase tracking-wide text-gray-300 mb-3">
      Description
    </span>
    <div className="browser-css text-white text-lg leading-relaxed">
      {parse(Post?.description || "")}
    </div>

  </Container>
</div>

  ) : (
    <div className="flex justify-center mb-4 relative dark:text-white text-gray-900 text-3xl rounded-xl p-2 ">
      You must Login first to view a post
    </div>
  );
}

export default Post;
