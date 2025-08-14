// src/layout/UserLayout.jsx
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';

// ====== CONFIG (giữ những file thật sự cần) ======
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
// ====== Loader an toàn, chống chèn trùng ======
const loadedCSS = new Set();
const loadedJS = new Map(); // src -> Promise<void>

function loadCSSOnce(href) {
  if (loadedCSS.has(href)) return;
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
  loadedCSS.add(href);
}

function loadScriptOnce(src) {
  if (loadedJS.has(src)) return loadedJS.get(src);
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    const p = Promise.resolve();
    loadedJS.set(src, p);
    return p;
  }
  const p = new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false; // giữ thứ tự
    s.onload = () => resolve();
    s.onerror = (err) => {
      console.warn(`Failed to load: ${src}`, err);
      resolve(); // không chặn flow
    };
    document.body.appendChild(s);
  });
  loadedJS.set(src, p);
  return p;
}

// ====== Swiper helpers ======
function safeInitSwiper(selector, options) {
  if (!window.Swiper) return null;
  const el = document.querySelector(selector);
  if (!el) return null;

  // destroy instance cũ (nếu có)
  if (el.swiper && !el.swiper.destroyed) {
    try { el.swiper.destroy(true, true); } catch {}
    el.swiper = null;
  }

  // option sạch: bỏ pagination/nav nếu element không tồn tại
  if (options?.pagination?.el && !document.querySelector(options.pagination.el)) {
    options = { ...options };
    delete options.pagination;
  }
  if (options?.navigation) {
    const { nextEl, prevEl } = options.navigation;
    if (!document.querySelector(nextEl) || !document.querySelector(prevEl)) {
      options = { ...options };
      delete options.navigation;
    }
  }
  if (options?.thumbs?.swiper == null) {
    options = { ...options };
    delete options.thumbs;
  }

  const inst = new window.Swiper(el, options);
  el.swiper = inst;
  return inst;
}

function destroyAllSwipers(root = document) {
  root.querySelectorAll('.swiper').forEach((el) => {
    if (el.swiper && !el.swiper.destroyed) {
      try { el.swiper.destroy(true, true); } catch {}
    }
    el.swiper = null;
  });
}

const UserLayout = () => {
  const location = useLocation();
  const bootedRef = useRef(false);          // đảm bảo load assets 1 lần
  const inittingRef = useRef(false);        // chống re-entrant
  const createdSwipersRef = useRef([]);     // nếu muốn track cụ thể instance

  // 1) Load CSS ngay khi mount (mỗi file 1 lần)
  useEffect(() => {
    cssFiles.forEach(loadCSSOnce);
  }, []);

  // 2) Mỗi lần đổi route: đảm bảo JS đã load, rồi init các Swiper có mặt
  useEffect(() => {
    let cancelled = false;

    const ensureAssets = async () => {
      // JS assets chỉ load 1 lần cho toàn app
      if (!bootedRef.current) {
        for (const src of jsFiles) {
          // giữ thứ tự (Bootstrap trước, Swiper sau)
          // eslint-disable-next-line no-await-in-loop
          await loadScriptOnce(src);
        }
        bootedRef.current = true;
      }
    };

    const initCarousels = () => {
      if (cancelled || inittingRef.current) return;
      inittingRef.current = true;

      // ====== CẤU HÌNH SWIPER ======
      const thumbConfig = {
        slidesPerView: 4,
        spaceBetween: 8,
        direction: 'horizontal',
        loop: false,                // loop dễ gây clone node → tránh
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
          1500: { slidesPerView: 6 },
          2000: { slidesPerView: 7 },
        },
      };

      const mainConfig = {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,                // tránh clone
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      };

      // ====== KHỞI TẠO TÙY VÀO DOM ĐANG CÓ ======
      // Category swiper
      const cat1 = safeInitSwiper('.category-swiper', {
        slidesPerView: 4, spaceBetween: 30, loop: false,
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

      const cat2 = safeInitSwiper('.category-swiper2', {
        slidesPerView: 3, spaceBetween: 20, loop: false,
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

      // Product gallery (page)
      const productThumb = safeInitSwiper('.product-gallery-swiper.thumb-swiper-lg', thumbConfig);
      const productMain = safeInitSwiper('.product-gallery-swiper2', {
        ...mainConfig,
        ...(productThumb ? { thumbs: { swiper: productThumb } } : {}),
      });

      // Quick modal gallery (chỉ init nếu modal đang trong DOM)
      const quickThumb = safeInitSwiper('.quick-modal-swiper.thumb-swiper-lg', thumbConfig);
      const quickMain = safeInitSwiper('.quick-modal-swiper2', {
        ...mainConfig,
        ...(quickThumb ? { thumbs: { swiper: quickThumb } } : {}),
      });

      // Lưu nếu bạn muốn chủ động destroy theo instance
      createdSwipersRef.current = [cat1, cat2, productThumb, productMain, quickThumb, quickMain].filter(Boolean);

      inittingRef.current = false;
    };

    const run = async () => {
      await ensureAssets();   // JS sẵn sàng
      if (cancelled) return;

      // Dọn các instance cũ (nếu route trước có)
      destroyAllSwipers(document);

      // Init theo DOM hiện tại
      initCarousels();
    };

    run();

    return () => {
      cancelled = true;
      // Dọn sạch Swiper khi rời route (hoặc unmount layout)
      destroyAllSwipers(document);
      createdSwipersRef.current = [];
      inittingRef.current = false;
    };
  }, [location.pathname]);

  // ====== Lưu ý về loader ngoài React ======
  // <div id="loading-area"> nên ở ngoài #root trong index.html. Nếu bạn vẫn xoá bằng JS,
  // hãy đảm bảo React không render/điều khiển node đó.

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
      {/* Outlet có key để force remount theo route, nhưng do chúng ta destroy trước/after nên OK */}
      <Outlet key={location.pathname} />
      <UserFooter />
    </HelmetProvider>
  );
};

export default UserLayout;