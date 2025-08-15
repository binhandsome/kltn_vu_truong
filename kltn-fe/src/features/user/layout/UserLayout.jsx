// src/layout/UserLayout.jsx
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import UserHeader from './UserHeader';
import UserFooter from './UserFooter';

// ===========================
// UserLayout.jsx — hardened
// - Loads CSS/JS once, in order
// - Swiper guard (destroy/re-init on route)
// - Bootstrap SelectorEngine shim to avoid "Illegal invocation"
// ===========================

// ---- CSS assets (order irrelevant; load once) ----
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

// ---- JS assets (order matters; load once sequentially) ----
const jsFiles = [
  // Core
  '/assets/user/js/jquery.min.js',
  '/assets/user/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',

  // Common vendors (relatively independent)
  '/assets/user/vendor/wow/wow.min.js',
  '/assets/user/vendor/imagesloaded/imagesloaded.js',
  '/assets/user/vendor/masonry/masonry-4.2.2.js',
  '/assets/user/vendor/masonry/isotope.pkgd.min.js',

  // UI widgets
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

  // Theme scripts — keep last, add back one-by-one if needed
  // '/assets/user/js/dz.carousel.js',
  // '/assets/user/js/dz.ajax.js',
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

  // Reuse existing <script> if present
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
    s.async = false; // preserve order
    s.defer = false;
    s.dataset.__loaded = '0';
    s.addEventListener('load', () => { s.dataset.__loaded = '1'; resolve(); }, { once: true });
    s.addEventListener('error', (err) => { console.warn('[UserLayout] Failed to load script:', src, err); resolve(); }, { once: true });
    document.body.appendChild(s);
  });
  loadedJS.set(src, p);
  return p;
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
    el.swiper = inst; return inst;
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
  const createdSwipersRef = useRef([]);

  // Load CSS once on mount
  useEffect(() => { cssFiles.forEach(loadCSSOnce); }, []);

  useEffect(() => {
    let cancelled = false;

    const ensureAssets = async () => {
      if (!bootedRef.current) {
        // Load sequentially to preserve dependencies
        for (const src of jsFiles) {
          // eslint-disable-next-line no-await-in-loop
          await loadScriptOnce(src);

          // Apply patch immediately after Bootstrap is loaded (before theme scripts that use it)
          if (src.includes('bootstrap.bundle.min.js')) {
            try {
              (function () {
                if (!window.bootstrap || !window.bootstrap.SelectorEngine) return;
                const SE = window.bootstrap.SelectorEngine;
                if (SE.__patched) return;

                const origFindOne = SE.findOne.bind(SE);
                SE.findOne = function (selector, root) {
                  if (!root || !(root.nodeType === 1 || root.nodeType === 9)) {
                    console.warn('[BS patch] Bad root for findOne:', root, 'selector:', selector, '-> fallback to document');
                    root = document;
                  }
                  try {
                    return origFindOne(selector, root);
                  } catch (e) {
                    console.error('[BS patch] findOne crashed for selector:', selector, 'root:', root, e);
                    return null;
                  }
                };

                // Quick validator to surface broken selectors
                const checkTargets = () => {
                  document.querySelectorAll('[data-bs-target]').forEach(el => {
                    const sel = el.getAttribute('data-bs-target');
                    try {
                      if (!sel || !document.querySelector(sel)) {
                        console.warn('[BS check] Bad data-bs-target:', sel, el);
                      }
                    } catch (err) {
                      console.warn('[BS check] Invalid CSS selector in data-bs-target:', sel, el);
                    }
                  });
                  document.querySelectorAll('[data-bs-parent]').forEach(el => {
                    const sel = el.getAttribute('data-bs-parent');
                    try {
                      if (!sel || !document.querySelector(sel)) {
                        console.warn('[BS check] Bad data-bs-parent:', sel, el);
                      }
                    } catch (err) {
                      console.warn('[BS check] Invalid CSS selector in data-bs-parent:', sel, el);
                    }
                  });
                };
                requestAnimationFrame(checkTargets);

                SE.__patched = true;
                console.log('[BS patch] SelectorEngine.findOne patched.');
              })();
            } catch (e) {
              console.warn('[UserLayout] Failed to patch Bootstrap SelectorEngine', e);
            }
          }
        }

        bootedRef.current = true;
      }
    };

    const initCarousels = () => {
      if (cancelled || inittingRef.current) return;
      inittingRef.current = true;

      const thumbConfig = {
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

      const mainConfig = {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      };

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

      const productThumb = safeInitSwiper('.product-gallery-swiper.thumb-swiper-lg', thumbConfig);
      const productMain = safeInitSwiper('.product-gallery-swiper2', {
        ...mainConfig,
        ...(productThumb ? { thumbs: { swiper: productThumb } } : {}),
      });

      const quickThumb = safeInitSwiper('.quick-modal-swiper.thumb-swiper-lg', thumbConfig);
      const quickMain = safeInitSwiper('.quick-modal-swiper2', {
        ...mainConfig,
        ...(quickThumb ? { thumbs: { swiper: quickThumb } } : {}),
      });

      createdSwipersRef.current = [cat1, cat2, productThumb, productMain, quickThumb, quickMain].filter(Boolean);
      inittingRef.current = false;
    };

    const run = async () => {
      await ensureAssets();
      if (cancelled) return;
      // Wait one frame so <Outlet/> children DOM exists
      await tick();
      destroyAllSwipers(document);
      initCarousels();
    };

    run();

    return () => {
      cancelled = true;
      destroyAllSwipers(document);
      createdSwipersRef.current = [];
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
};

export default UserLayout;