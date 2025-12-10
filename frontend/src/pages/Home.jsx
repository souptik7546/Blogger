import React, { useEffect, useState } from "react";
import postService from "../service/post.service";
import { Container, PostCard } from "../components/index";

function Home() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    postService
      .getAllPost()
      .then((posts) => {
        console.log("1111111111",posts);
        
        if (posts) {
          setPosts(posts.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts are currently available 
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return(
    <div className='w-full py-8'>
        <Container>
                <div className='flex flex-wrap'>
                    {posts?.map((post) => (
                        <div key={post._id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
    </div>
  )
}

export default Home;
