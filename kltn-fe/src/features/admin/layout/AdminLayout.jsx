import React, { useEffect, useState } from 'react';
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
  '/assets/admin/css/calender.css',
  '/assets/admin/css/theme.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
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
  '/assets/admin/js/calendar.min.js',

];

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inject CSS
    cssFiles.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });

    // Inject JS tuần tự để đảm bảo jQuery có trước
    const loadScript = (src) =>
      new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = resolve;
        document.body.appendChild(script);
      });

    const loadScriptsInOrder = async () => {
      for (const src of jsFiles) {
        await loadScript(src);
      }

      // Sau khi JS xong, bind lại menu
      const $ = window.$;
      if ($) {
        $('.main-menu li > a').off('click').on('click', function (e) {
          const $this = $(this);
          const $submenu = $this.next('.sub-menu');
          if ($submenu.length) {
            e.preventDefault();
            const $parent = $this.parent();
            $parent.toggleClass('open').siblings().removeClass('open');
            $submenu.slideToggle(300);
            $parent.siblings().find('.sub-menu').slideUp(300);
          }
        });
      }
    };

    loadScriptsInOrder();
    const timer = setTimeout(() => setLoading(false), 500);

    return () => {
      clearTimeout(timer);
      // Remove injected CSS/JS
      cssFiles.forEach((href) => {
        const el = document.querySelector(`link[href="${href}"]`);
        if (el) el.remove();
      });
      jsFiles.forEach((src) => {
        const el = document.querySelector(`script[src="${src}"]`);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div className="page-wrapper">
      {loading && <Loader />}
      <AdminHeader />
        <Sidebar />
        <Outlet />
    </div>
  );
};

export default AdminLayout;
