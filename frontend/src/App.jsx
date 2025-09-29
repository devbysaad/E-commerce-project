import MainRoutes from './routes/MainRoutes';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from './store/actions/userAction';

const App = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    !user && dispatch(getCurrentUser());
  }, [user]);

  return (
    <div className="bg-black  min-h-screen overflow-auto text-amber-50 w-screen">
      <Navbar className='fixed' />
      <MainRoutes />
    </div>
  );
};

export default App;
