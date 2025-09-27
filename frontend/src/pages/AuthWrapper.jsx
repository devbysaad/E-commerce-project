// AuthWrapper.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthWrapper = (props) => {
  const userData = useSelector((state) => state?.user?.userData);

  return userData ? props.children : <Navigate to="/login" />;
};

export default AuthWrapper;
