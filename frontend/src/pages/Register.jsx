import React from 'react'
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from 'react-router-dom';
import { getRegisterUser } from './../store/actions/userAction';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispacth = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()

  const RegisterHandler = (user) => {
    user.id = nanoid()
    user.cart = []

    // ✅ assign isAdmin according to selected role
    user.isAdmin = user.role === "admin"

    dispacth(getRegisterUser(user))
    navigate('/login')
    reset()
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
      <form 
        onSubmit={handleSubmit(RegisterHandler)} 
        className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Register</h1>

        <input 
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
          {...register('image')}
          type="url"
          placeholder="Profile Image URL"
        />
        <input 
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
          {...register('username')}
          type="text"
          placeholder="Username"
        />
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

        <select
          {...register("role")}
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
        >
          <option className="bg-gray-800 text-white" value="customer">Customer</option>
          <option className="bg-gray-800 text-white" value="admin">Creator</option>
        </select>

        <button 
          type="submit" 
          className="w-full py-3 mt-4 bg-amber-500 text-black font-semibold rounded-lg shadow-md hover:bg-amber-400 hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          Register
        </button>

        <p className="mt-5 text-gray-300 text-center">
          Already have an account?{" "}
          <Link className="text-amber-400 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
