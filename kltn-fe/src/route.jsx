import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import { useAuthReady } from './features/user/apiService/useAuthReady';
import { setNavigator } from './features/seller/utils/navigation';

const AppRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => { setNavigator(navigate); }, [navigate]);

  const isReady = useAuthReady();
  if (!isReady) return <div>⏳ Đang xác thực...</div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user" replace />} />

      {/* Toàn bộ user pages, gồm cả auth, nằm trong UserRoutes */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_SELLER']} requireAuth={false}>
            <UserRoutes />
          </ProtectedRoute>
        }
      />

      {/* Seller auth */}
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

      {/* Admin auth */}
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

      {/* Admin app */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* Seller app */}
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
