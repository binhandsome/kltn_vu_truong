import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../apiService/authService';

const NoAuthOnly = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/" replace /> : children;
};

export default NoAuthOnly;
