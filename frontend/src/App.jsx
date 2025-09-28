
import MainRoutes from './routes/MainRoutes';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from './store/actions/userAction';
import { asyncloadProduct } from './store/actions/productAction';
import Profile from './pages/user/Profile';
import Products from './pages/Products';

const App = () => {
  const product = useSelector((state) => state.product.productData);
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch()

  useEffect(() => {
    !user && dispatch(getCurrentUser())
  }, [user])

  useEffect(() => {
    product.length == 0 && dispatch(asyncloadProduct())
  }, [product])

  return (
    <div className='bg-black h-screen overflow-auto text-amber-50  w-screen'>
      <Navbar />
      <MainRoutes />
    </div>
  )
}

export default App