import axios from "../../api/config";
import { loadProduct } from "../reducers/productSlice";

// Load all products
export const asyncloadProduct = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/product`);
    dispatch(loadProduct(data));
  } catch (error) {
    console.log(error);
  }
};

// Create a new product
export const createProduct = (product) => async (dispatch, getState) => {
  try {
    await axios.post("/product", product);
    dispatch(asyncloadProduct());
  } catch (error) {
    console.log(error);
  }
};

// Delete a product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/product/${id}`);
    dispatch(asyncloadProduct());
  } catch (error) {
    console.log(error);
  }
};

// Update a product
export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    await axios.patch(`/product/${id}`, product);
    dispatch(asyncloadProduct());
  } catch (error) {
    console.log(error);
  }
};
