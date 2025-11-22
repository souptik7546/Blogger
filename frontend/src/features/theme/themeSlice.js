import { createSlice } from "@reduxjs/toolkit";

const initialState={
    darkTheme:true
}

const themeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        changeTheme:(state)=>{
           state.darkTheme=!state.darkTheme
        }
    }
})


export const {changeTheme}=themeSlice.actions
export default themeSlice.reducer