// AuthWrapper.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthWrapper = (props) => {
  const user = useSelector((state) => state.user.userData);

  return user ? props.children : <Navigate to='/login' />;
};

export default AuthWrapper;
