import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../apiService/authService';

const RequireAuth = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/user/auth/login" replace />;
};

export default RequireAuth;
