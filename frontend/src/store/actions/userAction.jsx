import axios from '../../api/config'
import { loaduser, removeuser } from '../reducers/userSlice';


export const getCurrentUser = () => async (dispatch, getState) => {
    try {

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) dispatch(loaduser(user))
        else console.log('user not found!');

    } catch (error) {
        console.log(error);


    }
}
export const logoutUser = () => async (dispatch, getState) => {
    try {
        localStorage.removeItem("user");
        dispatch(removeuser())
    } catch (error) {
        console.log(error);


    }
}
export const getLoginUser = (user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/user?email=${user.email}&password=${user.password}`)
        localStorage.setItem("user", JSON.stringify(data[0]));
        dispatch(getCurrentUser())
    } catch (error) {
        console.log(error);


    }
}

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${import.meta.env.VITE_REACT_APP_BACKEND}/user` + id, user);
    dispatch(loaduser(data));
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};



export const getRegisterUser = (user) => async (dispatch, getState) => {
    try {
        console.log(getState());
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/user`, user)
        console.log(res);

    } catch (error) {
        console.log(error);

    }
}
export const asyncDeleteUser = (id) => async (dispatch, getState) => {
  try {
    console.log(getState());

    await axios.delete('/user/' + id);

    dispatch(logoutUser());
    localStorage.removeItem("user"); // only remove by key
  } catch (error) {
    console.log("Delete user error:", error);
  }
};
