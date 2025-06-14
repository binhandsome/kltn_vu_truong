import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';

const cssFiles = [
  '/assets/admin/css/fonts.css',
  '/assets/admin/css/bootstrap.min.css',
  '/assets/admin/css/font-awesome.min.css',
  '/assets/admin/css/icofont.min.css',
  '/assets/admin/css/style.css',
  '/assets/admin/css/auth.css',
  '/assets/admin/css/custom.css',
];

const jsFiles = [
  '/assets/admin/js/jquery.min.js',
  '/assets/admin/js/popper.min.js',
  '/assets/admin/js/bootstrap.min.js',
  '/assets/admin/js/swiper.min.js',
  '/assets/admin/js/apexchart/apexcharts.min.js',
  '/assets/admin/js/apexchart/control-chart-apexcharts.js',
  '/assets/admin/js/nice-select.min.js',
  '/assets/admin/js/custom.js',
];

const AdminLayout = () => {
  useEffect(() => {
    cssFiles.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });

    jsFiles.forEach(src => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      }
    });

    return () => {
      cssFiles.forEach(href => {
        const el = document.querySelector(`link[href="${href}"]`);
        if (el) el.remove();
      });
      jsFiles.forEach(src => {
        const el = document.querySelector(`script[src="${src}"]`);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div className="page-wrapper">
      <Loader />
      <AdminHeader />
      <div className="page-wrapper">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
