import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
  '/assets/user/css/custom-fix.css',
];

const jsFiles = [
  '/assets/user/js/jquery.min.js',
  '/assets/user/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
  '/assets/user/vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
  '/assets/user/vendor/bootstrap-touchspin/bootstrap-touchspin.js',
  '/assets/user/vendor/wow/wow.min.js',
  '/assets/user/vendor/swiper/swiper-bundle.min.js',
  '/assets/user/vendor/magnific-popup/magnific-popup.js',
  '/assets/user/vendor/imagesloaded/imagesloaded.js',
  '/assets/user/vendor/masonry/masonry-4.2.2.js',
  '/assets/user/vendor/masonry/isotope.pkgd.min.js',
  '/assets/user/vendor/countdown/jquery.countdown.js',
  '/assets/user/vendor/counter/waypoints-min.js',
  '/assets/user/vendor/counter/counterup.min.js',
  '/assets/user/vendor/wnumb/wNumb.js',
  '/assets/user/vendor/nouislider/nouislider.min.js',
  '/assets/user/vendor/slick/slick.min.js',
  '/assets/user/vendor/lightgallery/dist/lightgallery.min.js',
  '/assets/user/vendor/lightgallery/dist/plugins/thumbnail/lg-thumbnail.min.js',
  '/assets/user/vendor/lightgallery/dist/plugins/zoom/lg-zoom.min.js',
  '/assets/user/js/dz.carousel.js',
  '/assets/user/js/dz.ajax.js',
  '/assets/user/js/custom.js',
];

const UserLayout = () => {
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

    // Inject JS in order
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

      // Init WOW
      if (window.WOW) {
        const wow = new window.WOW();
        wow.init();
        setTimeout(() => wow.sync(), 300);
      }
    };

    loadScriptsInOrder();

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
    <HelmetProvider>
      <Helmet>
        <title>Pixio: Shop & eCommerce HTML Template</title>
        <meta name="description" content="Elevate your online retail presence..." />
        <meta property="og:title" content="Pixio" />
        <meta property="og:image" content="https://pixio.dexignzone.com/xhtml/social-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/assets/user/images/favicon.png" />
      </Helmet>
      <UserHeader />
      <Outlet />
      <UserFooter />
    </HelmetProvider>
  );
};

export default UserLayout;
