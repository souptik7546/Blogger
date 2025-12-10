import React from 'react'
import { useEffect,useState } from 'react'
import { Container,PostForm } from '../components/index'
import { useParams,useNavigate } from 'react-router-dom'
import postService from '../service/post.service'
function EditPost() {
    const [posts,setPosts]=useState(null)
    const navigate=useNavigate()
    const {post} = useParams()
    useEffect(() => {
      if(post){
        postService.getPost(post)
        .then((postData)=>{
            if(postData){
                setPosts(postData)
            }
        })
        .catch((error)=>{
            console.log(error);
        })
      }
    }, [])
    
  return post ?(
  <div className='py-8'>
    <Container>
        <PostForm post={post}/>
    </Container>
  </div>
   ): null
}

export default EditPost