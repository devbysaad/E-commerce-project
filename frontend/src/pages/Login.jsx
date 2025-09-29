import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLoginUser } from '../store/actions/userAction';

const Login = () => {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const LoginHandler = (user) => {
    console.log(user);
    navigate('/')
    dispatch(getLoginUser(user))
    reset()
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
      <h1 className=' text-white'>{import.meta.env.VITE_APP_ECOMMER}</h1>
      <form 
        onSubmit={handleSubmit(LoginHandler)} 
        className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>

        <input 
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
          {...register('email')}
          type="email"
          placeholder="Email"
        />
        <input 
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
          {...register('password')}
          type="password"
          placeholder="********"
        />

        <button 
          type="submit" 
          className="w-full py-3 mt-4 bg-amber-500 text-black font-semibold rounded-lg shadow-md hover:bg-amber-400 hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          Login
        </button>

        <p className="mt-5 text-gray-300 text-center">
          Don’t have an account?{" "}
          <Link className="text-amber-400 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
