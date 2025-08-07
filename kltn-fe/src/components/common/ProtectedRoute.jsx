import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, requireAuth = true, redirectIfAuthenticated = false }) => {
  const token = localStorage.getItem('accessToken');

  // Nếu không yêu cầu xác thực, cho phép truy cập trực tiếp
  if (!requireAuth) {
    // Nếu đã đăng nhập và route yêu cầu chuyển hướng, chuyển đến trang chính
    if (redirectIfAuthenticated && token) {
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded.role || decoded.userRole;
        if (userRole === 'ROLE_ADMIN') return <Navigate to="/admin" replace />;
        if (userRole === 'ROLE_SELLER') return <Navigate to="/seller" replace />;
        return <Navigate to="/user" replace />; // Default cho ROLE_USER
      } catch (e) {
        console.error("❌ Lỗi decode token:", e.message);
        return <Navigate to="/user/auth/login" replace />;
      }
    }
    return children;
  }

  // ❌ Không có token => redirect login
  if (!token) {
    return <Navigate to="/user/auth/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role || decoded.userRole;

    // ❌ Không có role trong token
    if (!userRole) {
      console.warn("⚠️ Token không có role!");
      return <Navigate to="/unauthorized" replace />;
    }

    // ❌ Không nằm trong allowedRoles
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      console.warn("❌ Role không được phép:", userRole);
      return <Navigate to="/unauthorized" replace />;
    }

    // ✅ Được phép
    return children;
  } catch (e) {
    console.error("❌ Lỗi decode token:", e.message);
    return <Navigate to="/user/auth/login" replace />;
  }
};

export default ProtectedRoute;