import React, { useEffect } from 'react'
import postService from '../service/post.service'
import { Container,PostCard } from '../components/index'
import { useSelector,useDispatch } from 'react-redux'
import { getAllPosts } from '../features/post/postSlice'
function AllPost() {
    const posts= useSelector(state => state.posts)
    const dispatch= useDispatch()
    useEffect(() => {
     if(!posts.status){
        postService.getAllPost()
        .then(
            (data)=>{
                dispatch(getAllPosts({posts:data}))
            }
        )
        .catch((error)=>{
            console.log(error) 
        })
     }
    }, [])
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">
                {
                posts.map((post)=>(
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

export default AllPost