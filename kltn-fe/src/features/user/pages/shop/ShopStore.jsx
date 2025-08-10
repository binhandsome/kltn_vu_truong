// src/pages/shop/ShopStore.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

/* ====== CONFIG ====== */
const API_SEARCH  = process.env.REACT_APP_API_SEARCH  || "http://localhost:8085"; // search-service (ES)
const API_PRODUCT = process.env.REACT_APP_API_PRODUCT || "http://localhost:8083"; // product-service (detail)
const API_SELLER  = process.env.REACT_APP_API_SELLER  || "http://localhost:8089"; // seller-service

/* ====== HELPERS ====== */
const money = (n) =>
  Number(n || 0).toLocaleString("en-US", { style: "currency", currency: "USD" });

const img300 = (f) =>
  f?.startsWith("http")
    ? f
    : f
    ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${f}`
    : "/assets/images/placeholder.png";

// Chuẩn hoá facets từ ES
const normalizeFacets = (arr = []) =>
  arr
    .map((x) => ({
      name:
        x?.name ??
        x?.key ??
        (typeof x?.term === "string" ? x.term : String(x?.term ?? "")),
      count: Number(x?.count ?? x?.docCount ?? 0),
    }))
    .filter((i) => i.name);

/* Helpers an toàn + fallback cho shop header */
const safeNum = (v, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d);
const safeStr = (v, d = "") => (typeof v === "string" && v.trim() ? v : d);
const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit" });
};
const FALLBACK_BANNER = "/assets/images/background/bg1.jpg";
const FALLBACK_AVATAR = "/assets/images/placeholder.png";

/* ===== Token helper (đọc đúng key như ShopStandard) ===== */
const getAuthHeaders = () => {
  const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("accessToken") ||
    "";
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* ===== Màu: map tên màu → CSS ===== */
const COLOR_MAP = {
  black: "#000", white: "#fff", red: "#f00", green: "#008000", blue: "#00f",
  navy: "navy", teal: "teal", olive: "olive", maroon: "maroon",
  orange: "orange", purple: "purple", pink: "pink", yellow: "#ff0",
  gray: "gray", grey: "gray", silver: "silver", gold: "gold",
  beige: "beige", brown: "brown", violet: "violet", indigo: "indigo",
  cyan: "cyan", magenta: "magenta", wheat: "wheat",
  midnightblue: "midnightblue", lightblue: "lightblue", darkblue: "darkblue",
};
const toCssColor = (name, hex) => {
  if (hex) return hex;
  const norm = (name || "").toString().trim().toLowerCase().replace(/\s|-/g, "");
  return COLOR_MAP[norm] || (norm ? norm : "#eee");
};

/* ===== Chuẩn hoá màu từ product detail ===== */
const normalizeColors = (p) => {
  if (!p) return [];
  let arr = [];
  try {
    if (p.colorAsin) {
      arr = JSON.parse(p.colorAsin);
    } else if (Array.isArray(p.colors)) {
      arr = p.colors;
    }
  } catch {
    arr = [];
  }
  return (arr || []).map((c, idx) => {
    const name = c?.name_color ?? c?.name ?? `Color ${idx + 1}`;
    const hex  = c?.hex_code ?? c?.hexCode ?? c?.hex;
    return {
      colorId: Number(c?.color_id ?? c?.colorId ?? idx),
      name,
      css: toCssColor(name, hex),
    };
  });
};

/* ===== Danh mục: gom về string an toàn ===== */
const getCategoryLabel = (p) => {
  if (!p) return "";
  if (safeStr(p.categoryName)) return p.categoryName;
  const cats = p.categories;
  if (!cats) return "";
  if (typeof cats === "string") return cats;
  if (Array.isArray(cats)) return cats.map((x) => x?.name ?? x).join(", ");
  if (Array.isArray(cats.categories)) return cats.categories.map((x) => x?.name ?? x).join(", ");
  if (safeStr(cats.description)) return cats.description;
  return "";
};

export default function ShopStore() {
  // -------- URL params --------
  const [params, setParams] = useSearchParams();
  const storeId = params.get("shopId");
  const q = params.get("q") || "";
  const sort = params.get("sort") || "";
  const page = Number(params.get("page") || 0);
  const size = Number(params.get("size") || 20);
  const cat = params.get("category") || "";
  const min = params.get("min") || "";
  const max = params.get("max") || "";
  const discountOnly = params.get("discountOnly") === "1";

  const setQuery = (k, v) => {
    const p = new URLSearchParams(params);
    if (v == null || v === "") p.delete(k);
    else p.set(k, v);
    if (k !== "page") p.set("page", "0");
    setParams(p, { replace: true });
  };

  // -------- Toast --------
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const triggerToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  // -------- Local inputs --------
  const [priceMin, setPriceMin] = useState(min);
  const [priceMax, setPriceMax] = useState(max);
  useEffect(() => setPriceMin(min), [min]);
  useEffect(() => setPriceMax(max), [max]);

  // -------- Data states --------
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({ content: [], totalPages: 0, totalElements: 0 });

  const [rankCounts, setRankCounts] = useState([]);
  const [typeCounts, setTypeCounts] = useState([]);
  const [discounting, setDiscounting] = useState(0);

  const [inputValue, setInputValue] = useState(q);
  const debounce = (fn, delay = 500) => { let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args),delay); }; };
  const debouncedSetKeyword = useCallback(debounce((val)=>setQuery("q", val.trim()), 500),[]); // eslint-disable-line
  const handleInputChangeSearch = (e) => { const v=e.target.value; setInputValue(v); debouncedSetKeyword(v); };

  const selectedCats = useMemo(
    () => new Set((cat || "").split(",").map(s => s.trim()).filter(Boolean)),
    [cat]
  );
  const toggleCategory = (value) => {
    const next = new Set(selectedCats);
    next.has(value) ? next.delete(value) : next.add(value);
    setQuery("category", Array.from(next).join(","));
  };

  /* ===== Shop Header (LOAD từ BE) ===== */
  const [shopInfo, setShopInfo] = useState({
    name: "—",
    avatar: FALLBACK_AVATAR,
    banner: FALLBACK_BANNER,
    rating: 0,
    reviewCount: 0,
    followers: 0,
    productCount: 0,
    address: "—",
    joinedAt: "—",
    verified: false,
  });
  const [shopLoading, setShopLoading] = useState(false);
  const [shopError, setShopError] = useState("");

  useEffect(() => {
    if (!storeId) return;
    (async () => {
      try {
        setShopLoading(true);
        setShopError("");
        const { data } = await axios.get(`${API_SELLER}/api/seller/public/${storeId}`);
        const next = {
          name: safeStr(data?.name, "—"),
          avatar: safeStr(data?.avatar, FALLBACK_AVATAR),
          banner: safeStr(data?.banner, FALLBACK_BANNER),
          rating: safeNum(data?.rating, 0),
          reviewCount: safeNum(data?.reviewCount, 0),
          followers: safeNum(data?.followers, 0),
          productCount: safeNum(data?.productCount, 0),
          address: safeStr(data?.address, "—"),
          joinedAt: formatDate(data?.joinedAt),
          verified: Boolean(data?.verified),
        };
        setShopInfo(next);
      } catch (e) {
        console.error("load shop header error:", e);
        setShopError("Không tải được thông tin shop.");
      } finally {
        setShopLoading(false);
      }
    })();
  }, [storeId]);

  /* -------- FACETS: load 1 lần theo store -------- */
  useEffect(() => {
    if (!storeId) return;
    (async () => {
      try {
        const { data } = await axios.get(`${API_SEARCH}/api/search/store/${storeId}`, {
          params: { page: 0, size: 0 },
        });
        const f = data?.facets || {};
        setRankCounts(normalizeFacets(f.salesRank || []));
        setTypeCounts(normalizeFacets(f.productType || []));
        setDiscounting(Number(f.discounting || 0));
      } catch (e) {
        console.error("facets error:", e);
        setRankCounts([]); setTypeCounts([]); setDiscounting(0);
      }
    })();
  }, [storeId]);

  /* -------- PRODUCTS: cập nhật theo filter -------- */
  useEffect(() => {
    if (!storeId) return;
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_SEARCH}/api/search/store/${storeId}`, {
          params: {
            q: q || undefined,
            sort: sort || undefined,
            category: cat || undefined,
            min: min || undefined,
            max: max || undefined,
            discountOnly: discountOnly ? true : undefined,
            page,
            size,
          },
        });

        const content = Array.isArray(data?.content) ? data.content : [];
        const totalPages = Number(data?.totalPages ?? 0);
        const total = Number(data?.total ?? data?.totalElements ?? content.length);
        setPageData({ content, totalPages, totalElements: total });
      } catch (e) {
        console.error("ES search error:", e);
        setPageData({ content: [], totalPages: 0, totalElements: 0 });
      } finally {
        setLoading(false);
      }
    })();
  }, [storeId, q, sort, cat, min, max, discountOnly, page, size]);

  const products = useMemo(
    () =>
      pageData.content.map((p) => ({
        asin: p.asin,
        title: p.productTitle || p.nameProduct || "",
        thumb: p.productThumbnail || p.thumbnail || "",
        price: Number(p.productPrice ?? p.price ?? 0),
        off: Number(p.percentDiscount ?? p.discountPercent ?? 0),
      })),
    [pageData.content]
  );

  /* -------- Quick view detail -------- */
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableStock, setAvailableStock] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const openQuickView = async (asin) => {
    try {
      const { data } = await axios.get(`${API_PRODUCT}/api/products/productDetail/${asin}`);
      const colorsNorm = normalizeColors(data);
      setSelectedProduct({ ...(data || {}), _colors: colorsNorm });
      setSelectedColor(null);
      setSelectedSize(null);
      setAvailableStock(Number(data?.stockQuantity ?? 0));
      setQuantity(1);

      setTimeout(() => {
        const el = document.getElementById("exampleModal");
        if (window.bootstrap && el) new window.bootstrap.Modal(el).show();
      }, 50);
    } catch (e) {
      console.error("quick view error:", e);
      setSelectedProduct(null);
    }
  };
  // 
  
  

  // Tồn kho theo màu/size
  useEffect(() => {
    if (!selectedProduct) return;

    const colors = selectedProduct?._colors || [];
    const requiresSize = Array.isArray(selectedProduct?.sizes) && selectedProduct.sizes.length > 0;
    const requiresColor = colors.length > 0;
    const isFullySelected = (!requiresSize || selectedSize) && (!requiresColor || selectedColor);

    if (!isFullySelected) {
      const q = Number(selectedProduct?.stockQuantity ?? 0);
      setAvailableStock(q);
      setQuantity((cur) => Math.min(cur, q || 1));
      return;
    }

    (async () => {
      try {
        let url = `${API_PRODUCT}/api/product-variants/available-stock?productId=${selectedProduct.productId}`;
        if (selectedSize)  url += `&sizeId=${selectedSize.sizeId ?? selectedSize.id ?? selectedSize}`;
        if (selectedColor) url += `&colorId=${selectedColor.colorId ?? selectedColor.id ?? selectedColor}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch variant stock");
        const q = await res.json();
        setAvailableStock(Number(q || 0));
        setQuantity((cur) => Math.min(cur, Number(q || 0) || 1));
      } catch (err) {
        console.error("❌ Error fetching variant stock:", err);
        setAvailableStock(0);
        setQuantity(1);
      }
    })();
  }, [selectedProduct, selectedSize, selectedColor]);

  const decQty = () => setQuantity((q) => Math.max(1, q - 1));
  const incQty = () => {
    setQuantity((q) => {
      const limit = Number(availableStock ?? 0);
      if (!limit) return 1;
      if (q + 1 > limit) {
        triggerToast(`⚠️ Chỉ còn ${limit} sản phẩm có sẵn.`, "error");
        return limit;
      }
      return q + 1;
    });
  };

  /* -------- Wishlist & Cart -------- */
  const [wishlistItems, setWishlistItems] = useState([]);
  const [listCart, setListCart] = useState([]);

  const fetchWishlist = async () => {
    const headers = getAuthHeaders();
    if (!headers.Authorization) return;
    try {
      const res = await axios.get(`${API_PRODUCT}/api/wishlist`, { headers });
      setWishlistItems(res.data || []);
    } catch (e) {
      console.error("❌ Lỗi lấy wishlist:", e);
    }
  };

  useEffect(() => {
    fetchWishlist();
    const handleWishlistUpdated = () => fetchWishlist();
    window.addEventListener("wishlistUpdated", handleWishlistUpdated);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdated);
  }, []);

  const isProductInWishlist = (asin) => wishlistItems.some((item) => item.asin === asin);

  const handleToggleWishlist = async (asin) => {
    const headers = getAuthHeaders();
    if (!headers.Authorization) {
      triggerToast("Vui lòng đăng nhập để dùng wishlist", "error");
      return;
    }
    try {
      if (isProductInWishlist(asin)) {
        await axios.delete(`${API_PRODUCT}/api/wishlist/${asin}`, { headers });
        triggerToast("🗑️ Đã xóa sản phẩm khỏi wishlist");
      } else {
        await axios.post(`${API_PRODUCT}/api/wishlist/${asin}`, null, { headers });
        triggerToast("✅ Đã thêm sản phẩm vào wishlist");
      }
      const res = await axios.get(`${API_PRODUCT}/api/wishlist`, { headers });
      setWishlistItems(res.data || []);
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (e) {
      console.error("❌ Lỗi cập nhật wishlist:", e);
      triggerToast("Không thể cập nhật wishlist", "error");
    }
  };

  const getCartProduct = async () => {
    const cartId = localStorage.getItem("cartId") || "";
    const token  = localStorage.getItem("accessToken") || "";
    try {
      const res = await axios.get("http://localhost:8084/api/cart/getCart", {
        params: { cartId, token },
      });
      setListCart(res.data.items || []);
    } catch (error) {
      console.error("❌ Lỗi lấy giỏ hàng:", error);
      setListCart([]);
    }
  };

  useEffect(() => {
    getCartProduct();
    const handleCartUpdate = () => getCartProduct();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const isProductInCart = (asin) => listCart.some((item) => item.asin === asin);
// kiem tra cart so luong co chua bien the san pham
// lấy qty đã có trong giỏ cho đúng biến thể (asin + size + color)
const getInCartQty = (asin, sizeObj, colorObj) => {
  if (!Array.isArray(listCart)) return 0;

  const sizeName  = sizeObj?.sizeName ?? sizeObj?.name ?? sizeObj?.label ?? null;
  const colorName = colorObj?.name_color ?? colorObj?.nameColor ?? colorObj?.colorName ?? colorObj?.name ?? null;

  return listCart.reduce((sum, it) => {
    if (it.asin !== asin) return sum;

    // các key có thể có trong cart service
    const sameSize  = sizeName  ? (it.size === sizeName || it.sizeName === sizeName) : !it.size && !it.sizeName;
    const cartColor = it.color ?? it.nameColor ?? it.colorName ?? it.name_color;
    const sameColor = colorName ? cartColor === colorName : !cartColor;

    return (sameSize && sameColor) ? sum + Number(it.quantity || 0) : sum;
  }, 0);
};
const [pendingAdd, setPendingAdd] = useState(false);

useEffect(() => {
  const remain = getRemainingStock();
  setQuantity(q => Math.min(q, Math.max(1, remain || 1)));
}, [selectedProduct, selectedSize, selectedColor, availableStock, listCart]); 

// tồn còn có thể thêm cho biến thể đang chọn
const getRemainingStock = () => {
  const inCart = getInCartQty(selectedProduct?.asin, selectedSize, selectedColor);
  const stock  = Number(availableStock || 0);         // nhớ: đây phải là tồn theo biến thể
  return Math.max(0, stock - inCart);
};

const addCart = async () => {
  if (pendingAdd) return;
  if (!selectedProduct) return;

  // bắt buộc chọn đủ biến thể
  if (selectedProduct?.sizes?.length > 0 && !selectedSize) {
    triggerToast("⚠️ Vui lòng chọn size.", "error"); return;
  }
  if (selectedProduct?.colors?.length > 0 && !selectedColor) {
    triggerToast("⚠️ Vui lòng chọn màu.", "error"); return;
  }

  const remain = getRemainingStock();          // << trừ phần đã có trong giỏ
  if (remain <= 0) {
    triggerToast("❌ Biến thể này đã đạt số lượng tối đa trong giỏ.", "error"); return;
  }
  const qtyToAdd = Math.min(quantity, remain);

  try {
    setPendingAdd(true);

    const cartId = localStorage.getItem("cartId") || "";
    const token  = localStorage.getItem("accessToken") || "";

    const colorName =
      selectedColor?.name_color ?? selectedColor?.nameColor ?? selectedColor?.colorName ?? selectedColor?.name ?? null;
    const sizeName  =
      selectedSize?.sizeName ?? selectedSize?.name ?? selectedSize?.label ?? null;

    const payload = {
      token,
      asin: selectedProduct.asin,
      quantity: qtyToAdd,
      price: parseFloat(
        (selectedProduct.productPrice || 0) * (1 - Number(selectedProduct.percentDiscount || 0) / 100)
      ),
      cartId,
      // gửi đủ key để cart-service map đúng biến thể
      size: sizeName,
      sizeName,
      color: colorName,
      nameColor: colorName,
      colorName,
    };

    const res = await axios.post("http://localhost:8084/api/cart/addCart", payload);
    if (res.data?.cartId) localStorage.setItem("cartId", res.data.cartId);

    window.dispatchEvent(new Event("cartUpdated"));
    triggerToast("✅ Thêm vào giỏ hàng thành công!", "success");

    // cập nhật quantity theo phần còn có thể thêm
    const remainAfter = getRemainingStock();
    setQuantity(q => Math.min(q, Math.max(1, remainAfter)));
  } catch (e) {
    console.error(e);
    triggerToast("❌ Thêm giỏ hàng thất bại!", "error");
  } finally {
    setPendingAdd(false);
  }
};


  const addCartWithQuantity = async (qAdd, product) => {
    const cartId = localStorage.getItem("cartId") || "";
    const token  = localStorage.getItem("accessToken") || "";
    try {
      const payload = {
        token,
        asin: product.asin,
        quantity: qAdd,
        price: Number(product.price || 0),
        cartId,
      };
      const response = await axios.post("http://localhost:8084/api/cart/addCart", payload);
      if (response.data.cartId) {
        localStorage.setItem("cartId", response.data.cartId);
      }
      window.dispatchEvent(new Event("cartUpdated"));
      triggerToast("✅ Thêm vào giỏ hàng thành công!");
    } catch (error) {
      console.error("❌ Không thể thêm giỏ hàng:", error.response?.data || error.message);
      triggerToast("❌ Thêm giỏ hàng thất bại!", "error");
    }
  };

  /* -------- Pagination helper -------- */
  const maxPagesToShow = 10;
  const getPageRange = () => {
    const startPage = Math.floor(page / maxPagesToShow) * maxPagesToShow;
    const endPage = Math.min(startPage + maxPagesToShow, pageData.totalPages);
    return [...Array(Math.max(0, endPage - startPage)).keys()].map((i) => startPage + i);
  };

  // ===== Follow / Unfollow =====
  const [followed, setFollowed] = useState(false);
  const [pendingFollow, setPendingFollow] = useState(false);

  const toggleFollow = async () => {
    if (!storeId || pendingFollow) return;
    try {
      setPendingFollow(true);
      if (!followed) {
        const { data } = await axios.post(
          `${API_SELLER}/api/seller/public/${storeId}/follow`,
          null,
          { headers: getAuthHeaders() }
        );
        setFollowed(true);
        setShopInfo(s => ({ ...s, followers: Number(data?.followers ?? s.followers) }));
      } else {
        const { data } = await axios.delete(
          `${API_SELLER}/api/seller/public/${storeId}/follow`,
          { headers: getAuthHeaders() }
        );
        setFollowed(false);
        setShopInfo(s => ({ ...s, followers: Number(data?.followers ?? s.followers) }));
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        triggerToast("Vui lòng đăng nhập để theo dõi shop", "error");
      } else {
        console.error("toggle follow error:", e);
      }
    } finally {
      setPendingFollow(false);
    }
  };

  useEffect(() => {
    if (!storeId) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `${API_SELLER}/api/seller/public/${storeId}/follow-status`,
          { headers: getAuthHeaders() }
        );
        setFollowed(Boolean(data?.followed));
      } catch (e) {
        if (e?.response?.status !== 401) console.error("follow-status error:", e);
        setFollowed(false);
      }
    })();
  }, [storeId]);

  return (
    <div className="page-wraper">
      <div className="page-content bg-light">
        {/* ===== Banner GIỐNG ShopStandard ===== */}
        <div
          className="dz-bnr-inr bg-secondary overlay-black-light"
          style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}
        >
          <div className="container">
            <div className="dz-bnr-inr-entry">
              <h1>Cửa hàng tiêu chuẩn</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                  <li className="breadcrumb-item">Cửa hàng tiêu chuẩn</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* ===== SHOP HEADER (đổ từ BE) ===== */}
        <section className="store-header-wrap bg-light pb-3">
          <div
            className="store-banner position-relative"
            style={{
              height: 220,
              backgroundImage: `url(${shopInfo.banner || FALLBACK_BANNER})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 16,
            }}
          />
          <div className="container" style={{ marginTop: -50 }}>
            <div className="shadow-sm bg-white p-3 p-md-4 rounded-3 position-relative">
              <div
                className="position-absolute"
                style={{
                  top: -50, left: 24, width: 100, height: 100, borderRadius: "50%",
                  background: "#fff", padding: 4, boxShadow: "0 6px 20px rgba(0,0,0,.12)"
                }}
              >
                <img
                  src={shopInfo.avatar || FALLBACK_AVATAR}
                  alt={`shop avatar ${shopInfo.name || ""}`}
                  style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                  onError={(e)=>{ e.currentTarget.src = FALLBACK_AVATAR; }}
                />
              </div>

              <div className="row" style={{ paddingLeft: 140 }}>
                <div className="col-lg-8">
                  <div className="d-flex align-items-center mb-2 flex-wrap gap-2">
                    <h2 className="mb-0 me-2">{shopLoading ? "Đang tải…" : (shopInfo.name || "—")}</h2>
                    {shopInfo.verified && <span className="badge bg-success-subtle text-success border">Đã xác minh</span>}
                  </div>

                  {shopError && <div className="small text-danger mb-2">{shopError}</div>}

                  <div className="d-flex flex-wrap gap-3 text-secondary small mb-3">
                    <span>⭐ {Number(shopInfo.rating || 0).toFixed(1)} ({Number(shopInfo.reviewCount || 0)} đánh giá)</span>
                    <span>•</span>
                    <span>Người theo dõi: {Number(shopInfo.followers || 0).toLocaleString()}</span>
                    <span>•</span>
                    <span>Sản phẩm: {pageData.totalElements.toLocaleString()}</span>
                  </div>

                  <div className="d-flex flex-wrap gap-2 text-secondary small mb-2">
                    <span>📍 {shopInfo.address || "—"}</span>
                    <span>•</span>
                    <span>Tham gia: {shopInfo.joinedAt || "—"}</span>
                  </div>
                </div>

                <div className="col-lg-4 d-flex justify-content-lg-end mt-3 mt-lg-0">
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-secondary" onClick={toggleFollow} disabled={pendingFollow}>
                      <i className="icon feather icon-user-plus me-1" />
                      {followed ? "Đang theo dõi" : "Theo dõi"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BODY: sidebar trái + grid phải ===== */}
        <section className="content-inner-3 pt-3 z-index-unset">
          <div className="container-fluid">
            <div className="row">
              {/* ===== LEFT SIDEBAR ===== */}
              <div className="col-20 col-xl-3">
                <div className="sticky-xl-top">
                  <a href="javascript:void(0);" className="panel-close-btn">
                    <svg width={35} height={35} viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M37.748 12.5L12.748 37.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12.748 12.5L37.748 37.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  <div className="shop-filter mt-xl-2 mt-0">
                    <aside>
                      <div className="d-flex align-items-center justify-content-between m-b30">
                        <h6 className="title mb-0 fw-normal d-flex">
                          <i className="flaticon-filter me-3" />
                          Lọc
                        </h6>
                      </div>

                      {/* Search Product */}
                      <div className="widget widget_search">
                        <div className="form-group">
                          <div className="input-group">
                            <input
                              name="dzSearch"
                              value={inputValue}
                              onChange={handleInputChangeSearch}
                              required="required"
                              type="search"
                              className="form-control"
                              placeholder="Search Product"
                            />
                            <div className="input-group-addon">
                              <button type="button" className="btn" onClick={() => setQuery("q", inputValue.trim())}>
                                <i className="icon feather icon-search" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Giá (slider của theme) */}
                      <div className="widget">
                        <h6 className="widget-title">Giá</h6>
                        <div className="price-slide range-slider">
                          <div className="price">
                            <div className="range-slider style-1">
                              <div id="slider-tooltips2" className="mb-3" />
                              <span className="example-val" id="slider-margin-value-min2" />
                              <span className="example-val" id="slider-margin-value-max2" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Danh mục */}
                      <div className="widget widget_categories">
                        <h6 className="widget-title">Danh mục</h6>
                        <ul>
                          {rankCounts.map((r, idx) => {
                            const active = selectedCats.has(r.name);
                            return (
                              <li key={r.name || idx} className="cat-item cat-item-26">
                                <a
                                  href="#"
                                  onClick={(e)=>{e.preventDefault(); toggleCategory(r.name);}}
                                  style={{
                                    color: active ? '#fff' : 'inherit',
                                    background: active ? '#000' : 'transparent',
                                    padding: '2px 8px',
                                    borderRadius: 8
                                  }}
                                >
                                  {r.name}
                                </a> ({r.count})
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Loại */}
                      <div className="widget widget_categories">
                        <h6 className="widget-title">Loại</h6>
                        <ul>
                          {typeCounts.map((t, idx) => {
                            const active = selectedCats.has(t.name);
                            return (
                              <li key={t.name || idx} className="cat-item cat-item-26">
                                <a
                                  href="#"
                                  onClick={(e)=>{e.preventDefault(); toggleCategory(t.name);}}
                                  style={{
                                    color: active ? '#fff' : 'inherit',
                                    background: active ? '#000' : 'transparent',
                                    padding: '2px 8px',
                                    borderRadius: 8
                                  }}
                                >
                                  {t.name}
                                </a> ({t.count})
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <a
                        href="#"
                        className="btn btn-sm font-14 btn-secondary btn-sharp"
                        onClick={(e) => { e.preventDefault(); setQuery("category", ""); }}
                      >
                        Cài lại
                      </a>
                      <div className="small text-secondary mt-2">Đang giảm giá ({discounting})</div>
                    </aside>
                  </div>
                </div>
              </div>

              {/* ===== RIGHT GRID ===== */}
              <div className="col-80 col-xl-9">
                <div className="filter-wrapper">
                  <div className="filter-left-area">
                    <a
                      href="/user/shop/shopJustForYou"
                      style={{ display:'inline-block', backgroundColor:'#007bff', color:'white', padding:'10px 20px', borderRadius:'8px', textDecoration:'none', fontWeight:500 }}
                    >
                      🛍️ Đi mua sắm cho bạn
                    </a>
                  </div>

                  <div className="filter-right-area">
                    <a href="javascript:void(0);" className="panel-btn me-2">
                      <svg className="me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width={20} height={20}>
                        <g><path d="M2.54,5H15v.5A1.5,1.5,0,0,0,16.5,7h2A1.5,1.5,0,0,0,20,5.5V5h2.33a.5.5,0,0,0,0-1H20V3.5A1.5,1.5,0,0,0,18.5,2h-2A1.5,1.5,0,0,0,15,3.5V4H2.54Z"/></g>
                      </svg>
                      Filter
                    </a>

                    <div className="form-group">
                      <select className="default-select" value={sort} onChange={(e)=>setQuery("sort", e.target.value)}>
                        <option value="">Latest</option>
                        <option value="bestseller">Popularity</option>
                        <option value="priceAsc">Low to high</option>
                        <option value="priceDesc">High to Low</option>
                        <option value="new">Newest</option>
                      </select>
                    </div>

                    <div className="form-group Category">
                      <select className="default-select" value={String(size)} onChange={(e)=>setQuery("size", e.target.value)}>
                        <option value={20}>Products</option>
                        <option value={32}>32 Products</option>
                        <option value={44}>44 Products</option>
                        <option value={60}>60 Products</option>
                        <option value={72}>72 Products</option>
                        <option value={84}>84 Products</option>
                      </select>
                    </div>

                    {/* tab chỉ dùng grid */}
                    <div className="shop-tab">
                      <ul className="nav" role="tablist" id="dz-shop-tab">
                        <li className="nav-item" role="presentation">
                          <a href="#tab-list-grid" className="nav-link active" id="tab-list-grid-btn"
                             data-bs-toggle="pill" data-bs-target="#tab-list-grid" role="tab" aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={18} height={18}>
                              <g><path d="M42.667,373.333H96c23.564,0,42.667,19.103,42.667,42.667v53.333C138.667,492.898,119.564,512,96,512H42.667z"/></g>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* GRID – card style-1 + 3 nút */}
                <div className="row">
                  <div className="col-12 tab-content shop-" id="pills-tabContent">
                    <div className="tab-pane fade active show" id="tab-list-grid" role="tabpanel" aria-labelledby="tab-list-grid-btn">
                      <div className="row gx-xl-4 g-3">
                        {loading && products.length === 0 ? (
                          <div className="col-12 text-center p-5">Đang tải sản phẩm…</div>
                        ) : products.length === 0 ? (
                          <div className="col-12 text-center p-5">Chưa có sản phẩm phù hợp.</div>
                        ) : (
                          products.map((product, i) => {
                            const final = product.price - (product.price * product.off) / 100;
                            return (
                              <div key={product.asin || i} className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                                <div className="shop-card style-1">
                                  <div className="dz-media" style={{ position: 'relative' }}>
                                    <img src={img300(product.thumb)} alt={product.title} />
                                    {/* Overlay buttons */}
                                    <div className="shop-meta">
                                      <div
                                        className="btn btn-secondary btn-md btn-rounded"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => openQuickView(product.asin)}
                                      >
                                        <i className="fa-solid fa-eye d-md-none d-block" />
                                        <span className="d-md-block d-none">Xem nhanh</span>
                                      </div>

                                      <div
                                        style={{
                                          position: 'absolute',
                                          top: 10,
                                          right: 10,
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: 10,
                                          zIndex: 2,
                                        }}
                                      >
                                        <div
                                          onClick={() => handleToggleWishlist(product.asin)}
                                          style={{
                                            width: 40,
                                            height: 40,
                                            background: 'rgba(0,0,0,.4)',
                                            borderRadius: '50%',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            cursor:'pointer'
                                          }}
                                        >
                                          <i
                                            className={`icon feather ${isProductInWishlist(product.asin) ? 'icon-heart-on' : 'icon-heart'}`}
                                            style={{ fontSize: 20, color: isProductInWishlist(product.asin) ? 'red' : '#fff' }}
                                          />
                                        </div>
                                        <div
                                          onClick={() => addCartWithQuantity(1, product)}
                                          style={{
                                            width: 40,
                                            height: 40,
                                            background: 'rgba(0,0,0,.4)',
                                            borderRadius: '50%',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            cursor:'pointer'
                                          }}
                                        >
                                          <i className="icon feather icon-shopping-cart" style={{ fontSize: 20, color: isProductInCart(product.asin) ? 'red' : '#fff' }} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="dz-content">
                                    <h5 className="title">
                                      <a href={`/user/productstructure/ProductDetail?asin=${product.asin}`}>{product.title}</a>
                                    </h5>
                                    <h5 className="price">
                                      {money(final)} {product.off > 0 && <del>{money(product.price)}</del>}
                                    </h5>
                                  </div>

                                  {product.off > 0 && (
                                    <div className="product-tag"><span className="badge">Giảm {product.off}%</span></div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                {pageData.totalPages > 1 && (
                  <div className="row page mt-0">
                    <div className="col-md-6">
                      <p className="page-text">{pageData.totalElements.toLocaleString()} sản phẩm</p>
                    </div>
                    <div className="col-md-6">
                      <nav aria-label="Product Pagination">
                        <ul className="pagination style-1">
                          <li className="page-item">
                            <a className={`page-link ${page <= 0 ? 'disabled' : ''}`}
                               onClick={() => setQuery("page", String(Math.max(0, page - 1)))}>Trước</a>
                          </li>
                          {getPageRange().map((p) => (
                            <li className="page-item" key={p}>
                              <a className={`page-link ${p === page ? 'active' : ''}`} onClick={() => setQuery("page", String(p))}>
                                {p + 1}
                              </a>
                            </li>
                          ))}
                          <li className="page-item">
                            <a className={`page-link next ${page >= pageData.totalPages - 1 ? 'disabled' : ''}`}
                               onClick={() => setQuery("page", String(Math.min(pageData.totalPages - 1, page + 1)))}>Sau</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* QUICK VIEW MODAL */}
          <div className="modal quick-view-modal fade" id="exampleModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <i className="icon feather icon-x" />
                </button>
                <div className="modal-body">
                  <div className="row g-xl-4 g-3">
                    {/* Left: Image */}
                    <div className="col-xl-6 col-md-6">
                      <div className="dz-product-detail mb-0">
                        <div className="dz-media DZoomImage">
                          {selectedProduct && (
                            <img
                              src={img300(selectedProduct.productThumbnail)}
                              alt={selectedProduct.productTitle}
                              style={{ width: "100%", height: "auto" }}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Info */}
                    <div className="col-xl-6 col-md-6">
                      <div className="dz-product-detail style-2 ps-xl-3 ps-0 pt-2 mb-0">
                        <div className="dz-content">
                          {/* Title + rating + shop badge */}
                          <div className="dz-content-start">
                            {selectedProduct?.percentDiscount > 0 && (
                              <span className="badge bg-secondary mb-2">Giảm {selectedProduct.percentDiscount}%</span>
                            )}
                            <h4 className="title mb-1">{selectedProduct?.productTitle || ""}</h4>
                            <div className="small text-secondary mb-2">
                              ⭐ 0.0 <span className="text-muted">(0 khách hàng đánh giá)</span>
                            </div>

                            {storeId && (
                              <div className="d-flex align-items-center gap-2 p-2 rounded border mb-3">
                                <img
                                  src={shopInfo.avatar || FALLBACK_AVATAR}
                                  alt="shop"
                                  width={28}
                                  height={28}
                                  style={{ borderRadius: "50%", objectFit:"cover" }}
                                />
                                <div className="d-flex flex-column">
                                  <span className="fw-medium">{shopInfo.name || "Shop"}</span>
                                  <span className="text-secondary small">Theo dõi {Number(shopInfo.followers || 0).toLocaleString()} • Tham gia: {shopInfo.joinedAt || "—"}</span>
                                </div>
                                <a
                                  className="btn btn-sm btn-outline-secondary ms-auto"
                                  href={`/user/shop/ShopStore?shopId=${storeId}`}
                                >
                                  Xem Shop {shopInfo.name || ""}
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Giá + số lượng */}
                          <div className="meta-content m-b20">
                            <div className="mb-2">
                              <span className="form-label d-block">Giá</span>
                              <span className="price h4 mb-0 me-2 d-inline-block">
                                {selectedProduct
                                  ? money(Number(selectedProduct.productPrice||0)*(1-Number(selectedProduct.percentDiscount||0)/100))
                                  : "—"}
                              </span>
                              {selectedProduct?.percentDiscount > 0 && (
                                <del className="text-secondary">{money(selectedProduct.productPrice)}</del>
                              )}
                            </div>

                            <div className="d-flex align-items-center gap-2">
                              <span className="form-label me-2">Số lượng</span>
                              <button className="btn btn-dark rounded-circle p-0" style={{ width: 40, height: 40 }} onClick={decQty}>-</button>
                              <input
                                type="text"
                                className="form-control mx-2"
                                style={{ width: 60, textAlign: "center" }}
                                value={quantity}
                                onChange={(e) => {
                                  let v = parseInt(e.target.value, 10);
                                  if (isNaN(v) || v < 1) v = 1;
                                  const limit = Number(availableStock ?? 0);
                                  if (limit && v > limit) {
                                    triggerToast(`⚠️ Chỉ còn ${limit} sản phẩm có sẵn.`, "error");
                                    v = limit;
                                  }
                                  setQuantity(v);
                                }}
                              />
                              <button className="btn btn-dark rounded-circle p-0" style={{ width: 40, height: 40 }} onClick={incQty}>+</button>
                            </div>
                            <div className="small text-secondary mt-1">
                              Quantity: ({Number(availableStock ?? 0)} sản phẩm)
                            </div>
                          </div>

                          {/* Màu sắc */}
                          {selectedProduct?._colors?.length > 0 && (
                            <div className="mb-3">
                              <label className="form-label fw-bold">Màu sắc</label>
                              <div className="d-flex align-items-center flex-wrap gap-2">
                                {selectedProduct._colors.map((c) => {
                                  const active = selectedColor?.colorId === c.colorId;
                                  return (
                                    <div className="form-check" key={c.colorId}>
                                      <input
                                        className="btn-check"
                                        type="radio"
                                        name="colorRadios"
                                        id={`colorRadio-${c.colorId}`}
                                        checked={active}
                                        onChange={() => setSelectedColor(c)}
                                      />
                                      <label
                                        htmlFor={`colorRadio-${c.colorId}`}
                                        className="btn p-0"
                                        title={c.name}
                                        style={{
                                          width: 28, height: 28, borderRadius: "50%",
                                          border: "1px solid #ccc",
                                          background: c.css,   // <-- đã fix
                                          boxShadow: active ? "0 0 0 2px #000 inset" : "none"
                                        }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                              <p className="form-label mt-1">Selected: {selectedColor?.name || "None"}</p>
                            </div>
                          )}

                          {/* Kích thước */}
                          {selectedProduct?.sizes?.length > 0 && (
                            <div className="mb-3">
                              <label className="form-label fw-bold">Kích thước</label>
                              <div className="d-flex align-items-center flex-wrap gap-2">
                                {selectedProduct.sizes.map((s) => {
                                  const id = s.sizeId ?? s.id ?? s.value ?? s;
                                  const name = s.sizeName ?? s.name ?? String(s?.value ?? s);
                                  const active = (selectedSize?.sizeId ?? selectedSize?.id ?? selectedSize) === id;
                                  return (
                                    <button
                                      key={id}
                                      className={`btn btn-sm ${active ? "btn-dark" : "btn-outline-dark"}`}
                                      onClick={() => setSelectedSize({ sizeId: id, sizeName: name })}
                                    >
                                      {name}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Nút hành động */}
                          <div className="d-flex align-items-center gap-2">
                          <button
  className="btn btn-secondary text-uppercase"
  onClick={addCart}
  disabled={pendingAdd || getRemainingStock() <= 0 || quantity <= 0}
>
  {pendingAdd ? "Đang thêm..." : "Thêm vào giỏ"}
</button>

                            {selectedProduct?.asin && (
                              <button
                                className="btn btn-outline-dark"
                                onClick={() => handleToggleWishlist(selectedProduct.asin)}
                              >
                                Thêm Vào Yêu Thích
                              </button>
                            )}
                            {selectedProduct?.asin && (
                              <a
                                href={`/user/productstructure/ProductDetail?asin=${selectedProduct.asin}`}
                                className="btn btn-outline-secondary"
                              >
                                Xem Chi Tiết
                              </a>
                            )}
                          </div>

                          {/* SKU & meta */}
                          {selectedProduct && (
                            <div className="dz-info mb-0 mt-3">
                              <ul className="list-unstyled mb-0">
                                <li><strong>SKU:</strong> {selectedProduct.asin}</li>
                                <br/>
                                <li><strong>Danh mục:</strong> {selectedProduct.salesRank}</li><br/>
                                <li><strong>Loại:</strong> {selectedProduct.productType}</li><br/>                               
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>{/* modal-body */}
              </div>
            </div>
          </div>

          {/* TOAST */}
          {showToast && (
            <div
              style={{
                position: "fixed",
                right: 16,
                bottom: 16,
                background: toastType === "error" ? "#dc3545" : "#198754",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: 8,
                zIndex: 9999,
                boxShadow: "0 6px 20px rgba(0,0,0,.12)"
              }}
            >
              {toastMessage}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
