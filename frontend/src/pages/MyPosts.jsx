import React, { useEffect, useState } from 'react'
import { PostCard,Container } from '../components/index'
import authService from '../service/auth.service'
import { useSelector } from 'react-redux'


function MyPosts() {
    const userData= useSelector(state=> state.auth.userData)
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        authService
        .getUserProfile(userData?.username)
        .then((data)=>{
            setPosts(data?.data)
        })
        .catch((error)=>{
            console.log(error);    
        })
    },[])
    
  return (
   <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">
                {
                posts.posts?.map((post)=>(
                    <div key={post._id} className='p-2 w-1/4 '>
                        <PostCard {...post}/>
                    </div>
                ))
                }
            </div>
        </Container>
    </div>
  )
}

export default MyPosts