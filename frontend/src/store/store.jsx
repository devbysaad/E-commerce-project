import { configureStore } from "@reduxjs/toolkit";
import userSlice from './reducers/userSlice';
import productSlice from "./reducers/productSlice";
import cartSlice from "./reducers/cartSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
  },
   devTools: true,
});