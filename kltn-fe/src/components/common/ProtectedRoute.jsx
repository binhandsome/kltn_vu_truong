import { jwtDecode } from 'jwt-decode';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ 
  children, 
  allowedRoles, 
  requireAuth = true, 
  redirectIfAuthenticated = false,
  strictRoleCheck = false,
  redirectPath = '/user'
}) => {
  const token = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!requireAuth) {
    if (redirectIfAuthenticated && token) {
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded.role || decoded.userRole;
        if (userRole === 'ROLE_ADMIN') return <Navigate to="/admin" replace />;
        if (userRole === 'ROLE_SELLER') return <Navigate to="/seller" replace />;
        return <Navigate to="/user" replace />; // Default cho ROLE_USER
      } catch (e) {
        console.error("❌ Lỗi decode token:", e.message);
        localStorage.removeItem('accessToken'); // Xóa token lỗi
        return <Navigate to="/user/auth/login" replace />;
      }
    }
    return children;
  }

  if (!token) {
    return <Navigate to="/user/auth/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role || decoded.userRole;

    if (!userRole) {
      console.warn("⚠️ Token không có role!");
      localStorage.removeItem('accessToken'); 
      return <Navigate to="/user/auth/login" replace />;
    }

    if (location.pathname.startsWith('/admin') && userRole !== 'ROLE_ADMIN') {
      console.warn('❌ Unauthorized access to admin route by role:', userRole);
      return <Navigate to="/user" replace />;
    }

    if (location.pathname.startsWith('/seller') && userRole !== 'ROLE_SELLER') {
      console.warn('❌ Unauthorized access to seller route by role:', userRole);
      return <Navigate to="/user" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      console.warn("❌ Role không được phép:", userRole, "Allowed:", allowedRoles);
      
      if (strictRoleCheck) {
        return <Navigate to={redirectPath} replace />;
      }
      
      return <Navigate to="/unauthorized" replace />;
    }

    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      console.warn("⚠️ Token đã hết hạn!");
      localStorage.removeItem('accessToken');
      return <Navigate to="/user/auth/login" replace />;
    }

    // ✅ Được phép
    return children;
  } catch (e) {
    console.error("❌ Lỗi decode token:", e.message);
    localStorage.removeItem('accessToken'); // Xóa token lỗi
    return <Navigate to="/user/auth/login" replace />;
  }
};

export default ProtectedRoute;