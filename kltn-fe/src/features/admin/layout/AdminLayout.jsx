import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';

const AdminLayout = () => (
  <div className="page-wrapper">
    <Loader />
    <AdminHeader />
    <div className="page-wrapper">
      <Sidebar />
        <Outlet />
    </div>
  </div>
);

export default AdminLayout;
