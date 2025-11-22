import React,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button,RTE,Input,Select} from "../index"
import postService from "../../service/post.service"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm(post) {
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?.title || '',
            description: post?.description || '',
            status:post?.status || true,
            featuredImage: post?.featuredImage || ''
        }
    })
    const navigate=useNavigate()
    const submit= (data)=>{
        if(post){
            
        }
    }
  return (
    <div>PostForm</div>
  )
}

export default PostForm