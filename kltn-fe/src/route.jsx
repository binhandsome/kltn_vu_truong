import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './features/admin/routes';
import UserRoutes from './features/user/routes';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user" replace />} />
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
