import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { asyncDeleteUser, updateUser } from '../../store/actions/userAction'

const ProfileUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userData)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      image: user?.image || '',
      username: user?.username || '',  // changed "title" → "username"
      email: user?.email || '',
      password: user?.password || '',
      role: user?.role || '',
    }
  })

  const updateHandler = (formData) => {
    if (!user?.id) {
      console.error("❌ No user ID found!")
      return
    }

    // map role → isAdmin
    formData.isAdmin = formData.role === "admin"

    dispatch(updateUser(user.id, formData))
  }
  const deleteHandler =()=>{
    dispatch(asyncDeleteUser(user.id))
    navigate('/register')
  }



  return (
    <div className='flex flex-col bg-black h-[100%] overflow-auto'>
      <div className="flex pt-8 justify-center items-center bg-gray-900">
        <div className="flex items-center bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-2xl">
          <img
            src={user?.image || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-lg object-cover"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
            <h1 className="text-lg text-gray-300 mt-2">{user?.email}</h1>
            <h1 className="text-lg font-semibold mt-2">
              <span className={`${user?.isAdmin ? "text-yellow-400" : "text-green-400"}`}>
                {user?.isAdmin ? "Creator" : "Customer"}
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className='flex flex-col h-full items-center justify-center bg-gray-900'>
        <form onSubmit={handleSubmit(updateHandler)} className='flex flex-col items-center m-8 w-full max-w-md'>
          <input
            className='outline-none border-b w-full p-3 mb-4'
            {...register('image')}
            type="url"
            placeholder="Image URL"
          />
          <input
            className='outline-none border-b w-full p-3 mb-4'
            {...register('username')}
            type="text"
            placeholder='Username'
          />
          <input
            className='outline-none border-b w-full p-3 mb-4'
            {...register('email')}
            type="email"
            placeholder='Email'
          />
          <input
            className='outline-none border-b w-full p-3 mb-6'
            {...register('password')}
            type="text"
            placeholder='********'
          />
          <select
            {...register("role")}
            className="outline-none text-white border-b w-full p-3"
          >
            <option className='bg-gray-700 text-white' value="admin">Creator</option>
            <option className='bg-gray-700 text-white' value="customer">Customer</option>
          </select>
          <div className='flex mt-5 justify-center items-center gap-2'>
            <button
              type="submit"
              className="px-6 py-2 border border-gray-500 rounded-lg hover:bg-gray-700 hover:text-white active:scale-95 transition"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-500 rounded-lg hover:bg-gray-700 hover:text-white active:scale-95 transition"
            >
              Go back
            </button>
            <button
              type="button"
              onClick={deleteHandler}
              className="px-6 py-2 border border-gray-500 rounded-lg hover:bg-gray-700 hover:text-white active:scale-95 transition"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileUser
