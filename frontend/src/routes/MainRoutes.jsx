import { Routes, Route } from 'react-router-dom' // ✅ correct import
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import Products from '../pages/Products'
import Register from '../pages/Register'
import CreateProuct from '../pages/admin/CreateProuct'
import SingleProduct from '../pages/SingleProduct';
import ProfileUser from '../pages/user/ProfileUser'
import PageNotFound from '../pages/PageNotFound'
import AuthWrapper from '../pages/AuthWrapper';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/userProfile" element={<ProfileUser />}
      />
      <Route path="/createProduct"element={<CreateProuct />} />
      <Route path="/singleProduct/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>

  )
}

export default MainRoutes
