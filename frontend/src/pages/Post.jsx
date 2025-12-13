import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import postService from "../service/post.service";

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
  return Post ? (
    <div className="py-8 m-12">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 ">
          <img
            src={Post.featuredImage}
            alt={Post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${Post._id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold dark:text-white text-black">
            {Post.title}
          </h1>
        </div>
        <div className="browser-css dark:text-white text-black">
          {parse(Post?.description || "")}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
