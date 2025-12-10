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
  let isAuthor = false;
  useEffect(() => {
    if (post) {
      postService.getPost(post).then((data) => {
        if (data.createdBy === userData._id) {
          isAuthor = true;
          setPost(data);
        } else {
          isAuthor = false;
          navigate("/");
        }
      });
    }
    else{
        navigate("/")
    }
  }, []);
  const deletePost= ()=>{
    postService.deletePost(post)
    .then(()=>{
        navigate("/")
    })
    .catch((error)=>{
        console.log(error);
    })
  }

  return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
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
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.description)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post;
