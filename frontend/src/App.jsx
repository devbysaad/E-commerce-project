
import MainRoutes from './routes/MainRoutes';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from './store/actions/userAction';
import { asyncloadProduct } from './store/actions/productAction';
import Profile from './pages/user/Profile';
import Products from './pages/Products';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(asyncloadProduct())
  
  }, [dispatch])

  return (
    <div className='bg-gray-950 h-screen overflow-auto text-amber-50  w-screen'>
      <Navbar />
      <MainRoutes />
    </div>
  )
}

export default App