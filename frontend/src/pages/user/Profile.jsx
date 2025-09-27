import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions/userAction";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userData);

  const LogotHandler = () => {
    dispatch(logoutUser())
    navigate('/')
    setOpen(false)
  }
  const loginHandler = () => {
    navigate('/login')
    setOpen(false)
  }
  const registerHandler = () => {
    navigate('/register')
    setOpen(false)
  }
  const openProfileHandler = () => {
    navigate('/userProfile')
    setOpen(false)
  }
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className=" hover:text-amber-300">
        Settings
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-xl p-6 z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl">
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
   {user && user.username ? (
  <div
    onClick={openProfileHandler}
    className="cursor-pointer flex justify-center items-center mb-5 bg-gray-900"
  >
    <div className="flex flex-col items-center bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-2xl">
      <img
        src={user.image || "https://via.placeholder.com/120"}
        alt="Profile"
        className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-lg object-cover"
      />
      <div className="ml-6 text-center">
        <h1 className="text-2xl font-bold text-white">{user.username}</h1>
        <h1 className="text-lg text-gray-300 mt-2">{user.email}</h1>
        <h1 className="text-lg font-semibold mt-2">
          <span
            className={user.isAdmin ? "text-yellow-400" : "text-green-400"}
          >
            {user.isAdmin ? "Creator" : "Customer"}
          </span>
        </h1>
      </div>
    </div>
  </div>
) : (
  <h2 className="text-2xl font-bold mb-6">Known User</h2>
)}

        <button onClick={loginHandler} className="w-full py-2 mb-3 bg-amber-400 rounded-lg text-black font-semibold hover:bg-amber-300">
          Login
        </button>
        <button onClick={registerHandler} className="w-full py-2 mb-3 bg-amber-400 rounded-lg text-black font-semibold hover:bg-amber-300">
          Register
        </button>
        <button onClick={LogotHandler} className="w-full py-2 bg-red-500 rounded-lg text-white font-semibold hover:bg-red-400">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
