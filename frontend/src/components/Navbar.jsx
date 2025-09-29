import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom' // ✅ correct import
import { logoutUser } from '../store/actions/userAction'
import Profile from './../pages/user/Profile';

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userData);

  const LogotHandler = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <nav className="flex justify-between items-center fixed w-screen z-20 px-10 py-4 bg-gray-900 shadow-lg border-b border-gray-800">
      <div className="flex gap-8 text-lg font-medium">
        <NavLink
          className={(e) =>
            e.isActive
              ? "text-amber-400 border-b-2 border-amber-400 pb-1 transition-all duration-300"
              : "text-gray-300 hover:text-white hover:border-b hover:border-gray-600 pb-1 transition-all duration-300"
          }
          to="/"
        >
          Home
        </NavLink>

      
        {user && user.isAdmin && (
          <NavLink
            className={(e) =>
              e.isActive
                ? "text-amber-400 border-b-2 border-amber-400 pb-1 transition-all duration-300"
                : "text-gray-300 hover:text-white hover:border-b hover:border-gray-600 pb-1 transition-all duration-300"
            } to="/createProduct">Create
          </NavLink>
        )}
      </div>

      <div className="flex items-center gap-6">
        <NavLink to="/cart"  className={(e) =>
            e.isActive
              ? "text-amber-400 border-b-2 border-amber-400 pb-1 transition-all duration-300"
              : "text-gray-300 hover:text-white hover:border-b hover:border-gray-600 pb-1 transition-all duration-300"
          }>
Cart
</NavLink>
        <Profile  className={(e) =>
            e.isActive
              ? "text-amber-400 border-b-2 border-amber-400 pb-1 transition-all duration-300"
              : "text-gray-300 hover:text-white hover:border-b hover:border-gray-600 pb-1 transition-all duration-300"
          } />
        
      </div>
    </nav>

  )
}

export default Navbar
