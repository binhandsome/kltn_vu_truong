import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import AdminRoutes from './features/admin/routes';
import UserRoutes from './features/user/routes';
import SellerRoutes from './features/seller/routes';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLogin from './features/admin/pages/authentication/Login';
import SellerLogin from './features/seller/pages/authentication/Login';
import RegisterSeller from './features/seller/pages/authentication/Register';
import AdminLayout from './features/admin/layout/AdminLayout';
import AdminLayoutSeller from './features/seller/layout/AdminLayout';
import Registration from './features/user/pages/auth/Registration';
import Login from './features/user/pages/auth/Login';
import ForgetPassword from './features/user/pages/auth/ForgetPassword';
import UserLayout from './features/user/layout/UserLayout';
import { useAuthReady } from './features/user/apiService/useAuthReady';
import { useNavigate } from 'react-router-dom';
import { setNavigator } from './features/seller/utils/navigation';
const AppRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => { setNavigator(navigate); }, [navigate]);
    const isReady = useAuthReady();

  if (!isReady) return <div>⏳ Đang xác thực...</div>;
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user" replace />} />
  <Route path="/user/auth" element={<UserLayout/>} >
    <Route
      path="login"
      element={
        <ProtectedRoute requireAuth={false} redirectIfAuthenticated={true}>
          <Login />
        </ProtectedRoute>
      }
    />
       <Route
      path="registration"
      element={
        <ProtectedRoute requireAuth={false} redirectIfAuthenticated={true}>
          <Registration />
        </ProtectedRoute>
      }
    />
       <Route
      path="forgetpassword"
      element={
        <ProtectedRoute requireAuth={false} redirectIfAuthenticated={true}>
          <ForgetPassword />
        </ProtectedRoute>
      }
    />
  </Route>
      {/* Seller login & register với redirect nếu đã đăng nhập */}
      <Route path="/seller/authentication" element={<AdminLayoutSeller />}>
        <Route
          path="login"
          element={
            <ProtectedRoute requireAuth={false} redirectIfAuthenticated={true}>
              <SellerLogin />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute requireAuth={false} redirectIfAuthenticated={true}>
              <RegisterSeller />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin login với redirect nếu đã đăng nhập */}
      <Route path="/admin/authentication" element={<AdminLayout />}>
        <Route
          path="login"
          element={
            <ProtectedRoute requireAuth={false} redirectIfAuthenticated={true}>
              <AdminLogin />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Route cho /user/* với UserRoutes, không yêu cầu đăng nhập */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_SELLER']} requireAuth={false}>
            <UserRoutes />
          </ProtectedRoute>
        }
      />

      {/* Route cho /admin/* */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* Route cho /seller/* */}
      <Route
        path="/seller/*"
        element={
          <ProtectedRoute allowedRoles={['ROLE_SELLER']}>
            <SellerRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;