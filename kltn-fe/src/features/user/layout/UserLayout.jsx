// src/layout/UserLayout.jsx
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import UserHeader from './UserHeader';
import UserFooter from './UserFooter';

// ===========================
// UserLayout.jsx — hardened
// ===========================

// ---- CSS assets ----
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

// ---- JS assets (order matters) ----
const jsFiles = [
  // Core
  '/assets/user/js/jquery.min.js',
  '/assets/user/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',

  // Vendors
  '/assets/user/vendor/wow/wow.min.js',
  '/assets/user/vendor/imagesloaded/imagesloaded.js',
  '/assets/user/vendor/masonry/masonry-4.2.2.js',
  '/assets/user/vendor/masonry/isotope.pkgd.min.js',
  '/assets/user/vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
  '/assets/user/vendor/swiper/swiper-bundle.min.js',
  '/assets/user/vendor/magnific-popup/magnific-popup.js',
  '/assets/user/vendor/slick/slick.min.js',
  '/assets/user/vendor/lightgallery/dist/lightgallery.min.js',
  '/assets/user/vendor/lightgallery/dist/plugins/thumbnail/lg-thumbnail.min.js',
  '/assets/user/vendor/lightgallery/dist/plugins/zoom/lg-zoom.min.js',
  '/assets/user/vendor/countdown/jquery.countdown.js',
  '/assets/user/vendor/counter/waypoints-min.js',
  '/assets/user/vendor/counter/counterup.min.js',
  '/assets/user/vendor/wnumb/wNumb.js',
  '/assets/user/vendor/nouislider/nouislider.min.js',

  // Charts
  'https://cdn.jsdelivr.net/npm/apexcharts',

  // Theme core scripts (KHÔI PHỤC để giữ đúng kích thước/behavior gốc)
  '/assets/user/js/dz.carousel.js',
  '/assets/user/js/dz.ajax.js',

  // Custom theme
  '/assets/user/js/custom.min.js',
  '/assets/user/js/dashbord-account.js',
];

// ---- One-time loaders ----
const loadedCSS = new Set();
const loadedJS = new Map(); // src -> Promise<void>

function loadCSSOnce(href) {
  if (typeof document === 'undefined') return;
  if (loadedCSS.has(href)) return;
  if (!document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
  loadedCSS.add(href);
}

function loadScriptOnce(src) {
  if (typeof document === 'undefined') return Promise.resolve();
  if (loadedJS.has(src)) return loadedJS.get(src);

  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    const p = new Promise((resolve) => {
      if (existing.dataset.__loaded === '1') resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
    });
    loadedJS.set(src, p);
    return p;
  }

  const p = new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false; // giữ thứ tự
    s.defer = false;
    s.dataset.__loaded = '0';
    s.addEventListener('load', () => {
      s.dataset.__loaded = '1';
      resolve();
    }, { once: true });
    s.addEventListener('error', (err) => {
      console.warn('[UserLayout] Failed to load script:', src, err);
      resolve(); // không chặn flow
    }, { once: true });
    document.body.appendChild(s);
  });
  loadedJS.set(src, p);
  return p;
}

// ---- Bootstrap patches ----
function patchBootstrapOnce() {
  if (typeof window === 'undefined' || !window.bootstrap) return;

  // 1) Guard SelectorEngine.findOne (fix Illegal invocation)
  try {
    const SE = window.bootstrap.SelectorEngine;
    if (SE && !SE.__patched) {
      const origFindOne = SE.findOne.bind(SE);
      SE.findOne = function (selector, root) {
        if (!root || !(root.nodeType === 1 || root.nodeType === 9)) root = document;
        try { return origFindOne(selector, root); } catch (e) {
          console.warn('[BS patch] findOne crashed:', selector, e);
          return null;
        }
      };
      SE.__patched = true;
      requestAnimationFrame(() => {
        document.querySelectorAll('[data-bs-target]').forEach((el) => {
          const sel = el.getAttribute('data-bs-target');
          try {
            if (!sel || !document.querySelector(sel)) {
              console.warn('[BS check] Bad data-bs-target:', sel, el);
            }
          } catch {
            console.warn('[BS check] Invalid selector in data-bs-target:', sel, el);
          }
        });
      });
    }
  } catch (e) {
    console.warn('[UserLayout] SelectorEngine patch failed', e);
  }

  // 2) Guard Modal backdrop (fix QuickView lỗi 'backdrop' undefined)
  try {
    const M = window.bootstrap.Modal;
    if (M && !M.__patchedBackdrop) {
      const _init = M.prototype._initializeBackdrop;
      M.prototype._initializeBackdrop = function (...args) {
        this._config = this._config || {};
        if (typeof this._config.backdrop === 'undefined') this._config.backdrop = true;
        return _init ? _init.apply(this, args) : undefined;
      };
      const _show = M.prototype.show;
      M.prototype.show = function (...args) {
        if (!this._element || !(this._element instanceof Element)) {
          console.warn('[BS patch] Modal.show with invalid element -> skip');
          return;
        }
        this._config = this._config || { backdrop: true };
        return _show.apply(this, args);
      };
      M.__patchedBackdrop = true;
    }
  } catch (e) {
    console.warn('[UserLayout] Modal backdrop patch failed', e);
  }
}

// ---- Swiper helpers ----
function safeInitSwiper(selector, options) {
  if (typeof window === 'undefined' || !window.Swiper) return null;
  const el = document.querySelector(selector);
  if (!el) return null;

  if (el.swiper && !el.swiper.destroyed) {
    try { el.swiper.destroy(true, true); } catch {}
    el.swiper = null;
  }

  let clean = { ...options };
  if (clean?.pagination?.el && !document.querySelector(clean.pagination.el)) {
    clean = { ...clean }; delete clean.pagination;
  }
  if (clean?.navigation) {
    const { nextEl, prevEl } = clean.navigation;
    if (!document.querySelector(nextEl) || !document.querySelector(prevEl)) {
      clean = { ...clean }; delete clean.navigation;
    }
  }
  if (clean?.thumbs && !clean?.thumbs?.swiper) {
    clean = { ...clean }; delete clean.thumbs;
  }

  try {
    const inst = new window.Swiper(el, clean);
    el.swiper = inst;
    return inst;
  } catch (e) {
    console.warn('[UserLayout] Swiper init failed for', selector, e);
    return null;
  }
}

function destroyAllSwipers(root = document) {
  if (typeof document === 'undefined') return;
  root.querySelectorAll('.swiper').forEach((el) => {
    if (el.swiper && !el.swiper.destroyed) {
      try { el.swiper.destroy(true, true); } catch {}
    }
    el.swiper = null;
  });
}

const tick = () => new Promise((r) => requestAnimationFrame(() => r()));

export default function UserLayout() {
  const location = useLocation();
  const bootedRef = useRef(false);
  const inittingRef = useRef(false);

  // CSS once
  useEffect(() => { cssFiles.forEach(loadCSSOnce); }, []);

  useEffect(() => {
    let cancelled = false;

    const ensureAssets = async () => {
      if (!bootedRef.current) {
        for (const src of jsFiles) {
          // eslint-disable-next-line no-await-in-loop
          await loadScriptOnce(src);
          if (src.includes('bootstrap.bundle.min.js')) patchBootstrapOnce();
        }
        bootedRef.current = true;
      } else {
        patchBootstrapOnce();
      }
    };

    const initCarousels = () => {
      if (cancelled || inittingRef.current) return;
      inittingRef.current = true;

      // Chỉ init các Swiper nếu có (không đụng Slick của theme)
      const thumbCfg = {
        slidesPerView: 4,
        spaceBetween: 8,
        direction: 'horizontal',
        loop: false,
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
      const mainCfg = {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      };

      // Category sliders (nếu dùng Swiper)
      safeInitSwiper('.category-swiper', {
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

      safeInitSwiper('.category-swiper2', {
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

      // Product gallery page
      const productThumb = safeInitSwiper('.product-gallery-swiper.thumb-swiper-lg', thumbCfg);
      safeInitSwiper('.product-gallery-swiper2', {
        ...mainCfg,
        ...(productThumb ? { thumbs: { swiper: productThumb } } : {}),
      });

      // Quick modal gallery (nếu modal đã render)
      const quickThumb = safeInitSwiper('.quick-modal-swiper.thumb-swiper-lg', thumbCfg);
      safeInitSwiper('.quick-modal-swiper2', {
        ...mainCfg,
        ...(quickThumb ? { thumbs: { swiper: quickThumb } } : {}),
      });

      inittingRef.current = false;
    };

    const run = async () => {
      await ensureAssets();
      if (cancelled) return;

      await tick(); // đợi DOM Outlet

      // Swiper: dọn trước rồi init lại theo DOM hiện tại
      destroyAllSwipers(document);
      initCarousels();

      // KHÔNG init Slick ở đây -> để dz.carousel.js của theme làm,
      // nhờ vậy kích thước & hiệu ứng y như bản gốc.
    };

    run();

    return () => {
      cancelled = true;
      destroyAllSwipers(document);
      inittingRef.current = false;
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
}
