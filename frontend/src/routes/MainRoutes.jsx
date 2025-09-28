import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom' // ✅ correct import
import UnauthWrapper from './UnauthWrapper'

const Cart = lazy(() => import('../pages/Cart'))
const Login = lazy(() => import('../pages/Login'))
const Products = lazy(() => import('../pages/Products'))
const Register = lazy(() => import('../pages/Register'))
const SingleProduct = lazy(() => import('../pages/SingleProduct'))
const ProfileUser = lazy(() => import('../pages/user/ProfileUser'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))
const CreateProduct = lazy(() => import('../pages/admin/CreateProuct'))
const AuthWrapper = lazy(() => import('./AuthWrapper'))

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthWrapper><Products /></AuthWrapper>} />
      <Route path="/login" element={<UnauthWrapper><Login /></UnauthWrapper>} />
      <Route path="/register" element={<UnauthWrapper><Register /></UnauthWrapper>} />
      <Route
        path="/userProfile" element={<AuthWrapper><ProfileUser /></AuthWrapper>}
      />
      <Route path="/createProduct" element={<CreateProduct />} />
      <Route path="/singleProduct/:id" element={<AuthWrapper><SingleProduct /></AuthWrapper>} />
      <Route path="/cart" element={<AuthWrapper><Cart /></AuthWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>

  )
}

export default MainRoutes
