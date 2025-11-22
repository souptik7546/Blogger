import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    posts:null
}

const postSlice=createSlice({
    name:"post",
    initialState,
    reducers:{
        getAllPosts:(state,action)=>{
            state.status=true
            state.posts=action.payload.posts
        }
    }
})

export const {getAllPosts}=postSlice.actions

export default postSlice.reducer