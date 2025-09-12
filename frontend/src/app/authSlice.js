import {createSlice} from "@reduxjs/toolkit"




const initialState={
    status:false,
    userData:null
}

const authSlice= createSlice({
    name: "auth",
    initialState,
    reducers:{                                      //note inside this slice reducers all the functions are known as actions
        login:(state,action)=>{
            state.status=true,
            state.userData=action.payload.userData
        },
        logout:(state)=>{
            state.status=false,
            state.userData=null
        }
    }
})



export const {login,logout}= authSlice.actions

export default authSlice.reducer