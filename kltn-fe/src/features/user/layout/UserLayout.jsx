import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';

const cssFiles = [
  '/assets/user/icons/feather/css/iconfont.css',
  '/assets/user/icons/fontawesome/css/all.min.css',
  '/assets/user/icons/iconly/index.min.css',
  '/assets/user/icons/themify/themify-icons.css',
  '/assets/user/icons/flaticon/flaticon_pixio.css',

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
  '/assets/user/vendor/wow/wow.min.js',
  '/assets/user/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
  '/assets/user/vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
  '/assets/user/vendor/bootstrap-touchspin/bootstrap-touchspin.js',
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
  'https://cdn.jsdelivr.net/npm/apexcharts',
  '/assets/user/js/dz.carousel.js',
  '/assets/user/js/dz.ajax.js',
  '/assets/user/js/custom.min.js',
  '/assets/user/js/dashbord-account.js',
];

const UserLayout = () => {
  const location = useLocation();

  // Chỉ inject CSS 1 lần
  useEffect(() => {
    cssFiles.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });

    return () => {
      // Nếu muốn cleanup khi rời toàn bộ layout
      // cssFiles.forEach((href) => {
      //   const el = document.querySelector(`link[href="${href}"]`);
      //   if (el) el.remove();
      // });
    };
  }, []);

  // Mỗi khi route (pathname) thay đổi thì load lại JS + init Swiper
  useEffect(() => {
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

    const loadScriptsAndInitSwiper = async () => {
      for (const src of jsFiles) {
        await loadScript(src);
      }

      // Đợi DOM hiển thị xong rồi mới init Swiper
      setTimeout(() => {
        if (window.Swiper) {
          new window.Swiper('.category-swiper', {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: true,
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
              576: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
              1500: { slidesPerView: 6 },
              2000: { slidesPerView: 7 },
            },
          });
        } else {
          console.warn('Swiper not found.');
        }
      }, 0);
    };

    loadScriptsAndInitSwiper();

    return () => {
      // Nếu cần remove script mỗi lần chuyển route
      // jsFiles.forEach((src) => {
      //   const el = document.querySelector(`script[src="${src}"]`);
      //   if (el) el.remove();
      // });
    };
  }, [location.pathname]);

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
      <Outlet key={location.pathname} />
      <UserFooter />
    </HelmetProvider>
  );
};

export default UserLayout;
