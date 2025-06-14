import React from 'react'; // Thêm dòng này
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';

const AdminLayout = () => {
  const [loading, setLoading] = React.useState(true); // Sử dụng React.useState

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 500); // Ví dụ: tắt loader sau 1 giây
  }, []);

  return (
    <div className="page-wrapper">
      {loading && <Loader />}
      <AdminHeader />
      <div className="page-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;