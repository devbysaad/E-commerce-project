import axios from "../../api/config";
import { loadProduct } from "../reducers/productSlice";

export const asyncloadProduct = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/product');
    dispatch(loadProduct(data));
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    await axios.post('/product', product);
    dispatch(asyncloadProduct());
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    await axios.delete('/product/' + id);
    dispatch(asyncloadProduct());
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    await axios.patch('/product/' + id, product);
    dispatch(asyncloadProduct());
  } catch (error) {
    console.log(error);
  }
};
