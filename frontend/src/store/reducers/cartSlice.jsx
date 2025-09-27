import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartData: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadCart: (state, action) => {
            console.log(action);
            state.cartData = action.payload;
        }
    }
});

export const { loadCart } = cartSlice.actions;
export default cartSlice.reducer;
