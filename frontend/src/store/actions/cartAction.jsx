import axios from '../../api/config'
import { loadCart } from "../reducers/cartSlice";

export const getCart = ()=> async (dispatch, getState)=>{
    
    try {
        console.log(getState());
        const res = await axios.get('/carts')
        dispatch(loadCart(res.data))
        console.log(res);
        
    } catch (error) { 
        console.log(error);
        
        
    }
}