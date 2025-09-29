import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData:[]
}

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        loadProduct:(state, action)=>{
             state.productData = action.payload
        },
        loadLazyProduct:(state,action)=>{
            state.productData= [...state.productData, ...action.payload]
        }
    }
})

export const {loadProduct, loadLazyProduct} = productSlice.actions
export default productSlice.reducer