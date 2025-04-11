import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';

const cssFiles = [
  '/assets/user/icons/iconly/index.min.css',
  '/assets/user/vendor/magnific-popup/magnific-popup.min.css',
  '/assets/user/vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
  '/assets/user/vendor/swiper/swiper-bundle.min.css',
  '/assets/user/vendor/nouislider/nouislider.min.css',
  '/assets/user/vendor/animate/animate.css',
  '/assets/user/vendor/lightgallery/dist/css/lightgallery.css',
  '/assets/user/vendor/lightgallery/dist/css/lg-thumbnail.css',
  '/assets/user/vendor/lightgallery/dist/css/lg-zoom.css',
  '/assets/user/vendor/slick/slick.css',
  '/assets/user/css/style.css',
  '/assets/user/css/skin/skin-1.css',
  '/assets/user/css/custom-fix.css', // nếu bạn có file override riêng
];

const UserLayout = () => {
  useEffect(() => {
    cssFiles.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Pixio: Shop & eCommerce HTML Template | DexignZone</title>
        <meta name="description" content="Elevate your online retail presence with Pixio Shop & eCommerce HTML Template. Crafted with precision, this responsive and feature-rich template provides a seamless and visually stunning shopping experience." />
        <meta property="og:title" content="Pixio: Shop & eCommerce HTML Template" />
        <meta property="og:description" content="Experience modern, beautiful, and fast eCommerce design with Pixio." />
        <meta property="og:image" content="https://pixio.dexignzone.com/xhtml/social-image.png" />
        <meta name="twitter:title" content="Pixio: Shop & eCommerce HTML Template" />
        <meta name="twitter:description" content="Experience modern, beautiful, and fast eCommerce design with Pixio." />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/assets/user/images/favicon.png" />
      </Helmet>

      <UserHeader />
      <Outlet />
      <UserFooter />
    </>
  );
};

export default UserLayout;
