import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData:null
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loaduser:(state, action)=>{
            
            state.userData = action.payload
        },
        removeuser:(state, action)=>{
            state.userData = null
        }
    },
})

export const {loaduser , removeuser} = userSlice.actions
export default userSlice.reducer