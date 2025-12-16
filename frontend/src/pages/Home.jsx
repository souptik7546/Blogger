import React, { useEffect, useState } from "react";
import postService from "../service/post.service";
import { Container, PostCard } from "../components/index";
import { useSelector,useDispatch } from 'react-redux'
import { getAllPosts } from '../features/post/postSlice'

function Home() {
   const posts= useSelector(state => state.posts)
    const dispatch= useDispatch()
    useEffect(() => {
     if(!posts.status){
        postService.getAllPost()
        .then(
            (data)=>{
                dispatch(getAllPosts({posts:data.data.data}))
            }
        )
        .catch((error)=>{
            console.log(error) 
        })
     }
    }, [])

  if (posts?.posts?.length === 0) {
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
                    {posts?.posts?.map((post) => (
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
