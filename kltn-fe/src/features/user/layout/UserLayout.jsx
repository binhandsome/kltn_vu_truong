import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
import 'mutation-observer';

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
  // Use CDN for UMD version to define global lightGallery and plugins
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
  const isInitializing = useRef(false);

  // Inject CSS once
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
      // Optional: Cleanup CSS on layout unmount
      // cssFiles.forEach((href) => {
      //   const el = document.querySelector(`link[href="${href}"]`);
      //   if (el) el.remove();
      // });
    };
  }, []);

  // Load JS and initialize Swiper on route change
  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = (err) => {
          console.warn(`Failed to load script: ${src}`, err);
          resolve();
        };
        document.body.appendChild(script);
      });

    const initSwiper = (selector, options) => {
      if (!window.Swiper) {
        return null;
      }
      const element = document.querySelector(selector);
      if (!element) {
        return null;
      }
      // Prevent reinitialization if already valid
      if (element.swiper && typeof element.swiper.destroy === 'function') {
        return element.swiper;
      }
      const swiperInstance = new window.Swiper(element, options);
      element.swiper = swiperInstance;
      return swiperInstance;
    };

    const loadScriptsAndInitSwiper = async () => {
      if (isInitializing.current) {
        return;
      }
      isInitializing.current = true;

      for (const src of jsFiles) {
        await loadScript(src);
      }

      setTimeout(() => {
        // Initialize .category-swiper if present
        initSwiper('.category-swiper', {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: true,
          autoplay: { delay: 2000, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
          breakpoints: {
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
            1500: { slidesPerView: 6 },
            2000: { slidesPerView: 7 },
          },
        });

        // Thumb config (horizontal to avoid stacking)
        const thumbConfig = {
          slidesPerView: 4,
          spaceBetween:-8,
          direction: 'horizontal',
          loop: true,
          freeMode: true,
          watchSlidesProgress: true,
          breakpoints: {
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { direction: 'vertical', slidesPerView: 4 },
          },
        };

        const mainConfig = {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          zoomedSlideClass: 'swiper-slide-zoomed',
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        };

        // Product Gallery Thumb and Main
        const productThumb = initSwiper('.product-gallery-swiper.thumb-swiper-lg', thumbConfig);
        if (productThumb) {
          initSwiper('.product-gallery-swiper2', {
            ...mainConfig,
            thumbs: { swiper: productThumb },
          });
        }

        // Quick Modal Thumb and Main
        const quickThumb = initSwiper('.quick-modal-swiper.thumb-swiper-lg', thumbConfig);
        if (quickThumb) {
          initSwiper('.quick-modal-swiper2', {
            ...mainConfig,
            thumbs: { swiper: quickThumb },
          });
        }

        // Category Swiper 2
        initSwiper('.category-swiper2', {
          slidesPerView: 3,
          spaceBetween: 20,
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
          breakpoints: {
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 6 },
          },
        });

        // Swiper Four (likely related products carousel)
        initSwiper('.swiper-four', {
          slidesPerView: 2,
          spaceBetween: 15,
          loop: true,
          autoplay: { delay: 2500, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
          breakpoints: {
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          },
        });

        isInitializing.current = false;
      }, 1000);
    };

    loadScriptsAndInitSwiper();

    return () => {
      document.querySelectorAll('.swiper').forEach((el) => {
        if (el.swiper && typeof el.swiper.destroy === 'function') {
          el.swiper.destroy(true, true);
          el.swiper = null;
        } else if (el.swiper) {
          el.swiper = null;
        }
      });
      isInitializing.current = false;
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