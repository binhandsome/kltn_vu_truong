// src/pages/common/HomePage.js
import React, { useEffect, useState, useMemo } from 'react';
import QuickViewModal from '../components/home/QuickViewModal';
import ScrollTopButton from '../layout/ScrollTopButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WOW from 'wowjs';
import 'mutation-observer';
import { useNavigate } from "react-router-dom";

function HomePage() {
  // ====== TOAST ======
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success'); // "success" | "error"
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const triggerToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };
  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };
  useEffect(() => {
    const successMsg = localStorage.getItem('loginSuccess');
    if (successMsg) {
      showToastMessage(successMsg);
      localStorage.removeItem('loginSuccess');
    }
  }, []);

  // ====== TOP 5 DEALS (đầu trang) ======
  const [top5Products, setTop5Products] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:8765/api/products/top-discounted', {
          params: { size: 5, status: 'active' },
        });
        setTop5Products(Array.isArray(res.data) ? res.data : (res.data?.content ?? []));
      } catch (e) {
        console.error('Top5 error:', e);
        setTop5Products([]);
      }
    })();
  }, []);

  // ====== CATEGORIES (đếm salesRank/productType) ======
  const [salesRankCount, setSalesRankCount] = useState([]);
  const [productTypeCount, setProductTypeCount] = useState([]);
  const getAllCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8765/api/products/getAllCategories');
      setSalesRankCount(response.data?.salesRankCount || {});
      setProductTypeCount(response.data?.productTypeCount || {});
      setTags(response.data?.tags || {}); // ✅ thêm dòng này
    } catch (error) {
      console.error('Không lấy được danh mục:', error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  // Feature Categories

  // ====== HOME FEED (nguồn riêng cho homepage) ======
  const [homeAllProducts, setHomeAllProducts] = useState([]); // nguồn để lọc
  useEffect(() => {
    (async () => {
      try {
        // lấy 1 mẻ lớn, đủ để client lọc 8 sản phẩm/mục
        const res = await axios.get('http://localhost:8765/api/search/searchAdvance', {
          params: { page: 0, size: 120 },
        });
        const list = res?.data?.content ?? [];
        setHomeAllProducts(list);
      } catch (err) {
        console.error('❌ Home fetch products failed:', err);
        setHomeAllProducts([]);
      }
    })();
  }, []);

  // ====== FILTER 8 SẢN PHẨM THEO productType ======
  const [selectedType, setSelectedType] = useState('ALL'); // giữ "Tất cả"
  const [grid8, setGrid8] = useState([]);
  useEffect(() => {
    const src =
      selectedType === 'ALL'
        ? homeAllProducts
        : homeAllProducts.filter((p) => (p.productType || 'Other') === selectedType);
    setGrid8(src.slice(0, 8));
  }, [selectedType, homeAllProducts]);
  const handlePickType = (type) => (e) => {
    e.preventDefault();
    setSelectedType(type);
  };

  // ====== HELPERS ======
  const imgUrl = (file) =>
    file?.startsWith('http')
      ? file
      : file
        ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_625,h_550/imgProduct/IMG/${file}`
        : '/assets/images/placeholder.png';

  const img300 = (file) =>
    `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${file}`;

  const priceAfterDiscount = (price, percent) =>
    Math.max(0, Number(price || 0) * (1 - Number(percent || 0) / 100));

  const money = (n) => Number(n || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const priceAfter = (price, percent) => {
    const p = Number(price || 0);
    const d = Number(percent || 0);
    return (p - (p * d) / 100).toFixed(2);
  };

  const slug = (s) =>
    s?.toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');

  // ====== CART/WISHLIST (kế thừa logic bạn đã có) ======
  const addCartWithQuantity = async (quantity, product) => {
    const cartId = localStorage.getItem('cartId') || '';
    const token = localStorage.getItem('accessToken') || '';
    try {
      const payload = {
        token,
        asin: product.asin,
        quantity,
        price: parseFloat(product.productPrice),
        cartId,
      };
      const response = await axios.post('http://localhost:8765/api/cart/addCart', payload);
      if (response.data.cartId) {
        localStorage.setItem('cartId', response.data.cartId);
      }
      window.dispatchEvent(new Event('cartUpdated'));
      triggerToast('✅ Thêm vào giỏ hàng thành công!');
    } catch (error) {
      console.error('❌ Không thể thêm giỏ hàng (from outside):', error.response?.data || error.message);
      triggerToast('❌ Thêm giỏ hàng thất bại!', 'error');
    }
  };
  // Xem nhanh chi tiet san pham
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableStock, setAvailableStock] = useState(null);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userAddress: '',
    gender: '',
    dateOfBirth: '',
    profilePicture: ''
  });
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({
        ...prev,
        profilePicture: reader.result,
        file // lưu lại để uploadImage dùng
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    setSelectedFile(e.target.files[0]);
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  // (tuỳ chọn) tags để hiển thị trong modal, không ảnh hưởng nơi khác
  const [tags, setTags] = useState({});
  // HomePage.js
  const fetchProductDetail = async (asin) => {
    try {
      const res = await axios.get(`http://localhost:8765/api/products/productDetail/${asin}`);
      const raw = res.data || {};

      // Lấy bản trong danh sách hiện có để fallback (grid/home feed/top5)
      const fromHome = homeAllProducts.find(p => p.asin === asin) || {};
      const fromTop5 = top5Products.find(p => p.asin === asin) || {};

      // ---- Chuẩn hoá field cho QuickView ----
      const product = {
        // Ưu tiên detail
        ...raw,

        // Tên & ảnh
        productTitle:
          raw.productTitle ?? raw.nameProduct ?? fromHome.productTitle ?? fromHome.nameProduct ?? fromTop5.nameProduct ?? "",
        productThumbnail:
          raw.productThumbnail ?? raw.thumbnail ?? fromHome.productThumbnail ?? fromHome.thumbnail ?? fromTop5.thumbnail ?? "",

        // Giá & % giảm
        productPrice:
          raw.productPrice ?? raw.price ?? fromHome.productPrice ?? fromHome.price ?? fromTop5.price ?? 0,
        percentDiscount:
          raw.percentDiscount ?? raw.discountPercent ?? fromHome.percentDiscount ?? fromHome.discountPercent ?? fromTop5.discountPercent ?? 0,

        // 🔥 SỐ ĐÃ BÁN – gộp từ mọi nguồn
        soldCount:
          Number(
            raw.soldCount ??
            raw.orderCount ??
            raw.orders ??
            fromHome.soldCount ??
            fromHome.orderCount ??
            fromHome.orders ??
            fromTop5.soldCount ??
            fromTop5.orderCount ??
            fromTop5.orders ??
            0
          ) || 0,

        // Tồn kho (nếu có)
        stockQuantity: raw.stockQuantity ?? fromHome.stockQuantity ?? null,
      };

      setSelectedProduct(product);
      setSelectedColor(null);
      setSelectedSize(null);
      setQuantity(1);
      setAvailableStock(product?.stockQuantity ?? null);

      // (tuỳ chọn) nếu bạn vẫn dùng priceDiscount ở nơi khác
      const d = Number(product.percentDiscount || 0);
      const p = Number(product.productPrice || 0);
      setPriceDiscount((p - (p * d / 100)).toFixed(2));

      // mở modal
      const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
    } catch (err) {
      console.error("❌ Lỗi lấy chi tiết sản phẩm:", err);
    }
  };


  // ====== QUICK VIEW: tính tồn kho theo biến thể ======
  useEffect(() => {
    if (!selectedProduct) return;

    const requiresSize = Array.isArray(selectedProduct?.sizes) && selectedProduct.sizes.length > 0;
    const hasColorJson = !!selectedProduct?.colorAsin;
    let colors = [];
    if (hasColorJson) {
      try { colors = JSON.parse(selectedProduct.colorAsin) || []; } catch { }
    }
    const requiresColor = colors.length > 0;

    const isFullySelected = (!requiresSize || selectedSize) && (!requiresColor || selectedColor);

    if (!isFullySelected) {
      setAvailableStock(selectedProduct?.stockQuantity ?? 0);
      return;
    }

    (async () => {
      try {
        let url = `http://localhost:8765/api/product-variants/available-stock?productId=${selectedProduct.productId}`;
        if (selectedSize) url += `&sizeId=${selectedSize.sizeId ?? selectedSize.size_id ?? selectedSize.id}`;
        if (selectedColor) url += `&colorId=${selectedColor.colorId ?? selectedColor.color_id ?? selectedColor.id}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch variant stock");
        const qty = await res.json();
        setAvailableStock(qty);
        setQuantity(q => Math.min(q, qty));
      } catch (e) {
        console.error("❌ Error fetching variant stock:", e);
        setAvailableStock(null);
      }
    })();
  }, [selectedProduct, selectedSize, selectedColor]);

  // ====== QUICK VIEW: handler số lượng (đặt tên riêng) ======
  const handleModalQtyChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) value = 1;
    if (availableStock !== null && value > availableStock) value = availableStock;
    setQuantity(value);
  };
  // ====== QUICK VIEW: add cart có size/color ======
  const addCartFromModal = async (qty, { size, color }) => {
    if (!selectedProduct) return;
    const cartId = localStorage.getItem("cartId") || "";
    const token = localStorage.getItem("accessToken") || "";

    // bắt buộc chọn nếu có biến thể
    const needSize = Array.isArray(selectedProduct?.sizes) && selectedProduct.sizes.length > 0;
    const needColor = !!selectedProduct?.colorAsin && JSON.parse(selectedProduct.colorAsin || "[]").length > 0;

    if (needSize && !size) return triggerToast("⚠️ Vui lòng chọn size.", "error");
    if (needColor && !color) return triggerToast("⚠️ Vui lòng chọn màu.", "error");
    if (availableStock === 0) return triggerToast("❌ Sản phẩm này đã hết hàng.", "error");
    if (qty > (availableStock ?? Infinity)) return triggerToast(`⚠️ Chỉ còn ${availableStock} sản phẩm có sẵn.`, "error");

    try {
      const payload = {
        token,
        asin: selectedProduct.asin,
        quantity: qty,
        price: parseFloat(
          (Number(selectedProduct.productPrice || 0) * (1 - Number(selectedProduct.percentDiscount || 0) / 100)).toFixed(2)
        ),
        cartId,
        size: size?.sizeName || null,
        nameColor: color?.name_color || null,
        colorAsin: selectedProduct.colorAsin || "[]", // backend của bạn đang expect JSON string
      };

      const response = await axios.post("http://localhost:8765/api/cart/addCart", payload);
      if (response.data.cartId) localStorage.setItem("cartId", response.data.cartId);

      window.dispatchEvent(new Event("cartUpdated"));
      triggerToast("✅ Thêm vào giỏ hàng thành công!", "success");
    } catch (error) {
      console.error("❌ Không thể thêm giỏ hàng:", error.response?.data || error.message);
      triggerToast("❌ Thêm giỏ hàng thất bại!", "error");
    }
  };
  // Xu li wishlist
  const [wishlistItems, setWishlistItems] = useState([]);
  const handleToggleWishlist = async (asin) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const isInWishlist = wishlistItems.some((item) => item.asin === asin);
    try {
      if (isInWishlist) {
        await axios.delete(`http://localhost:8765/api/wishlist/${asin}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        triggerToast("🗑️ Đã xóa sản phẩm khỏi wishlist");
      } else {
        await axios.post(`http://localhost:8765/api/wishlist/${asin}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        triggerToast("🗑️ Đã thêm sản phẩm vào wishlist");
      }

      const res = await axios.get("http://localhost:8765/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(res.data);
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("❌ Lỗi cập nhật wishlist:", error);
    }
  };
  const isProductInWishlist = (asin) => wishlistItems.some((item) => item.asin === asin);
  // Xu li them vao gio hang
  const [listCart, setListCart] = useState([]);
  const isProductInCart = (asin) => {
    return listCart.some((item) => item.asin === asin);
  };

  // ====== WOW init ======
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);
  // 
  useEffect(() => {
    // Gỡ mọi click handler mà theme đã gán cho .filters li (nếu có)
    if (window.jQuery) {
      try {
        window.jQuery('.filters li').off('click');        // gỡ toàn cục của theme
        window.jQuery('#hp-filter-list li').off('click'); // phòng trường hợp bind nhầm
      } catch (_) { }
    }
  }, []);
  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("Vui lòng chọn ảnh");
      return;
    }
    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await axios.post("http://localhost:8765/api/search/search-image", formData, {
     headers: {
  Authorization: `Bearer ${token}`,
},
      });
      console.log("Kết quả từ Spring Boot:", res.data);
      const asinList = res.data;
      navigate("/user/shop/ShopSideBar", { state: { asinList } });
    } catch (err) {
      console.error("Lỗi upload:", err);
    }
  };
 useEffect(() => {
  if (selectedFile) {
    handleUpload();
  }
}, [selectedFile]);


  const modalSoldCount = useMemo(() => {
    const asin = selectedProduct?.asin;
    if (!asin) return 0;

    // 1) ưu tiên từ API chi tiết
    if (typeof selectedProduct?.soldCount === 'number') return selectedProduct.soldCount;

    // 2) fallback từ các list hiện có
    const fromList =
      homeAllProducts.find?.(p => p.asin === asin) ||
      grid8.find?.(p => p.asin === asin) ||
      top5Products.find?.(p => p.asin === asin);

    const sc = fromList?.soldCount ?? fromList?.orderCount ?? fromList?.orders;
    return Number(sc) || 0;
  }, [selectedProduct, homeAllProducts, grid8, top5Products]);
  return (
    <>
      <div className="page-wraper">

        {/* Header (đã được xử lý trong App.js) */}
        <div className="page-content bg-light">
          <div className="main-slider-wrapper">

            <div className="slider-inner">
              <div className="avatar-upload d-flex align-items-center">
                <div className="position-relative">
                  {/* Preview ảnh to hơn */}
                  <div
                    className="avatar-preview thumb"
                    style={{
                      width: 180,        // tăng chiều rộng
                      height: 180,       // tăng chiều cao
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      id="imagePreview"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundImage: `url(${imagePreview ||
                          "https://cdn-icons-png.freepik.com/512/3226/3226223.png"
                          })`,
                      }}
                    />
                  </div>

                  <div>
                    <div className="change-btn thumb-edit d-flex align-items-center flex-wrap">
                      <input
                        type="file"
                        className="form-control d-none"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleFileChange}
                      />
                      {/* Camera icon to hơn */}
                      <label
                        htmlFor="imageUpload"
                        className="btn btn-light ms-0"
                        style={{
                          padding: "12px 18px",       // nút to hơn
                          fontSize: "1.5rem",         // icon to hơn
                        }}
                      >
                        <i className="fa-solid fa-camera" />
                      </label>
                    </div>

                    {/* Chữ hướng dẫn */}
                    <div className="mt-2 text-center">
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          color: "#555",
                          lineHeight: 1.4,
                        }}
                      >
                        📷 Upload ảnh sản phẩm bạn cần tìm kiếm,
                        <br />
                        tôi sẽ gợi ý cho bạn ✨
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">

                <div className="col-lg-6">
                  <div className="slider-main">
                    {top5Products.map((p) => {
                      // chuẩn hoá object theo format các trang khác dùng
                      const norm = {
                        ...p,
                        asin: p.asin,
                        productTitle: p.nameProduct,
                        productThumbnail: p.thumbnail,
                        percentDiscount: p.discountPercent,
                        // dùng giá đã giảm khi add cart
                        productPrice: priceAfterDiscount(p.price, p.discountPercent),
                      };

                      return (
                        <div className="slick-slide" key={`main-${p.asin}`}>

                          <div className="content-info">
                            <h1 className="title">{p.nameProduct}</h1>

                            <div className="swiper-meta-items">
                              <div className="meta-content">
                                <span className="price-name">
                                  {p.discountPercent > 0 ? `Price (−${p.discountPercent}%)` : 'Price'}
                                </span>
                                <span className="price-num d-inline-block">
                                  {money(priceAfterDiscount(p.price, p.discountPercent))}
                                </span>
                              </div>
                            </div>

                            <div className="content-btn m-b30">
                              {/* THÊM VÀO GIỎ HÀNG */}
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  addCartWithQuantity(1, norm);
                                }}
                                className="btn btn-secondary me-xl-3 me-2 btnhover20"
                              >
                                THÊM VÀO GIỎ HÀNG
                              </a>

                              {/* XEM CHI TIẾT */}
                              <a
                                href={`/user/productstructure/ProductDetail?asin=${p.asin}`}
                                className="btn btn-outline-secondary btnhover20"
                                onClick={() => {
                                  // nếu bạn muốn lưu lịch sử xem/đề xuất:
                                  // handleSearchAsin(p.asin);
                                }}
                              >
                                XEM CHI TIẾT
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                <div className="col-lg-6">
                  <div className="slider-thumbs">
                    {top5Products.length > 0 ? (
                      top5Products.map((p, idx) => (
                        <div className="slick-slide" key={`thumb-${p.asin}`}>
                          <div className="banner-media" data-name={p.salesRank ?? p?.product?.salesRank}>
                            <div className="img-preview">
                              {/* dùng src trực tiếp để ảnh load sẵn như bản đổ cứng */}
                              <img
                                src={imgUrl(p.thumbnail)}
                                alt={p.nameProduct || `product-${idx + 1}`}
                                loading="eager"

                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="slick-slide">
                          <div className="banner-media" data-name="MÙA ĐÔNG">
                            <div className="img-preview">
                              <img src="../../assets/user/images/banner/banner-media.png" alt="banner-media" />
                            </div>
                          </div>
                        </div>
                        <div className="slick-slide">
                          <div className="banner-media" data-name="MÙA HÈ">
                            <div className="img-preview">
                              <img src="../../assets/user/images/banner/banner-media2.png" alt="banner-media" />
                            </div>
                          </div>
                        </div>
                        <div className="slick-slide">
                          <div className="banner-media" data-name="XÀ CẠP">
                            <div className="img-preview">
                              <img src="../../assets/user/images/banner/banner-media.png" alt="banner-media" />
                            </div>
                          </div>
                        </div>
                        <div className="slick-slide">
                          <div className="banner-media" data-name="ĐẦM">
                            <div className="img-preview">
                              <img src="../../assets/user/images/banner/banner-media4.png" alt="banner-media" />
                            </div>
                          </div>
                        </div>
                        <div className="slick-slide">
                          <div className="banner-media" data-name="QUẦN SHORT">
                            <div className="img-preview">
                              <img src="../../assets/user/images/banner/banner-media5.png" alt="banner-media" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
           
              <svg
                className="star-1"
                xmlns="http://www.w3.org/2000/svg"
                width={94}
                height={94}
                viewBox="0 0 94 94"
                fill="none"
              >
                <path
                  d="M47 0L53.8701 30.4141L80.234 13.766L63.5859 40.1299L94 47L63.5859 53.8701L80.234 80.234L53.8701 63.5859L47 94L40.1299 63.5859L13.766 80.234L30.4141 53.8701L0 47L30.4141 40.1299L13.766 13.766L40.1299 30.4141L47 0Z"
                  fill="#FEEB9D"
                />
              </svg>
              <svg
                className="star-2"
                xmlns="http://www.w3.org/2000/svg"
                width={82}
                height={94}
                viewBox="0 0 82 94"
                fill="none"
              >
                <path
                  d="M41 0L45.277 39.592L81.7032 23.5L49.554 47L81.7032 70.5L45.277 54.408L41 94L36.723 54.408L0.296806 70.5L32.446 47L0.296806 23.5L36.723 39.592L41 0Z"
                  fill="black"
                />
              </svg>
              <a
                className="animation-btn popup-youtube"
                href="https://www.youtube.com/watch?v=YwYoyQ1JdpQ"
              >
                <div className="text-row word-rotate-box c-black">
                  <span className="word-rotate">
                    {/* More Collection Explore */}
                    Thêm bộ sưu tập Khám phá</span>
                  <i className="fa-solid fa-play text-dark badge__emoji" />
                </div>
              </a>
            </div>
          </div>
          {/* Shop Section Start */}
          {/* === Featured Categories (4 items, click -> category page) === */}
          <section className="shop-section overflow-hidden">
            <div className="container-fluid p-0">
              <div className="row">
                {/* LEFT: slider of category cards */}
                <div className="col-lg-8 left-box">
                  <div className="swiper swiper-shop">
                    <div className="swiper-wrapper">
                      {(() => {
                        // 1) Chọn 4 loại từ productTypeCount, bỏ 2 loại ít hàng
                        const blocked = new Set(["Outerwear", "Bottoms"]);
                        const types = Object.keys(productTypeCount || {})
                          .filter(t => !blocked.has(t))
                          .slice(0, 4);

                        // 2) Icon gợi ý (PNG nền trong suốt). Có thể thay sau bằng Cloudinary của bạn.
                        const ICONS = {
                          Dresses: "https://tse3.mm.bing.net/th/id/OIP.B3ZjrxhR4E1Qq0uIt39RBQHaHa?pid=Api",
                          Tops: "https://tse4.mm.bing.net/th/id/OIP.jd4cctfhy6Vk6NJE40BKXQHaHa?r=0&pid=Api",
                          "Other Clothing": "https://tse2.mm.bing.net/th/id/OIP.KWTn7Z1Izoqb_DwVtGCMjgAAAA?pid=Api",
                          Other: "https://tse1.mm.bing.net/th/id/OIP.vN_ZuUp72eAAnBpMUoHglAHaHa?pid=Api",
                        };
                        const imgFor = (type) => ICONS[type] || "/assets/images/placeholder.png";

                        return types.map((type, idx) => (
                          <div className="swiper-slide" key={type}>
                            <div
                              className="shop-box style-1 wow fadeInUp"
                              data-wow-delay={`${0.2 + idx * 0.2}s`}
                            >
                              <div className="dz-media" style={{ display: "flex", justifyContent: "center" }}>
                                <img
                                  src={imgFor(type)}
                                  alt={type}
                                  style={{ width: 140, height: 140, objectFit: "contain" }}
                                />
                              </div>

                              <h6 className="product-name" style={{ textAlign: "center" }}>
                                <a
                                  href={`/user/shop/shopWithCategory?productType=${encodeURIComponent(type)}`}
                                >
                                  {type}
                                </a>
                              </h6>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* CTA dưới cùng (giữ nguyên) */}
                  <a className="icon-button" href="/user/shop/shopWithCategory">
                    <div className="text-row word-rotate-box c-black border-secondary">
                      <span className="word-rotate">Thêm bộ sưu tập Khám phá</span>
                      <svg className="badge__emoji" xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 35 35" fill="none">
                        <path d="M32.2645 16.9503H4.08145L10.7508 10.4669C11.2604 9.97176 10.5046 9.1837 9.98813 9.68289C9.98815 9.68286 2.35193 17.1063 2.35193 17.1063C2.12911 17.3092 2.14686 17.6755 2.35196 17.8903C2.35193 17.8903 9.98815 25.3169 9.98815 25.3169C10.5021 25.81 11.2622 25.0367 10.7508 24.5328C10.7508 24.5329 4.07897 18.0441 4.07897 18.0441H32.2645C32.9634 18.0375 32.9994 16.9636 32.2645 16.9503Z" fill="#000" />
                      </svg>
                    </div>
                  </a>
                </div>

                {/* RIGHT: title + prev/next (theme swiper sẽ hook 2 nút này nếu có) */}
                <div className="col-lg-4 right-box">
                  <div>
                    <h3 className="title wow fadeInUp" data-wow-delay="1.2s">Danh mục nổi bật</h3>
                    <p className="text wow fadeInUp" data-wow-delay="1.4s">
                      Khám phá những sản phẩm thịnh hành nhất tại Pixio.
                    </p>
                    <div className="pagination-align wow fadeInUp" data-wow-delay="1.6s">
                      <div className="shop-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                          <path d="M32.2645 16.9503H4.08145L10.7508 10.4669C11.2604 9.97176 10.5046 9.1837 9.98813 9.68289C9.98815 9.68286 2.35193 17.1063 2.35193 17.1063C2.12911 17.3092 2.14686 17.6755 2.35196 17.8903C2.35193 17.8903 9.98815 25.3169 9.98815 25.3169C10.5021 25.81 11.2622 25.0367 10.7508 24.5328C10.7508 24.5329 4.07897 18.0441 4.07897 18.0441H32.2645C32.9634 18.0375 32.9994 16.9636 32.2645 16.9503Z" fill="white" />
                        </svg>
                      </div>
                      <div className="shop-button-next">
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                          <path d="M2.73549 16.9503H30.9186L24.2492 10.4669C23.7396 9.97176 24.4954 9.1837 25.0119 9.68289L32.6481 17.1063C32.8709 17.3092 32.8531 17.6755 32.648 17.8903L25.0118 25.3169C24.4979 25.81 23.7378 25.0367 24.2492 24.5328L30.921 18.0441H2.73549C2.03663 18.0375 2.00064 16.9636 2.73549 16.9503Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <a className="icon-button" href="/user/shop/shopWithCategory">
                    <div className="text-row word-rotate-box c-black border-white">
                      <span className="word-rotate">Thêm bộ sưu tập Khám phá</span>
                      <svg className="badge__emoji" xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 35 35" fill="none">
                        <path d="M32.2645 16.9503H4.08145L10.7508 10.4669C11.2604 9.97176 10.5046 9.1837 9.98813 9.68289C9.98815 9.68286 2.35193 17.1063 2.35193 17.1063C2.12911 17.3092 2.14686 17.6755 2.35196 17.8903C2.35193 17.8903 9.98815 25.3169 9.98815 25.3169C10.5021 25.81 11.2622 25.0367 10.7508 24.5328C10.7508 24.5329 4.07897 18.0441 4.07897 18.0441H32.2645C32.9634 18.0375 32.9994 16.9636 32.2645 16.9503Z" fill="white" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Shop Section End */}
          {/* About Section Start */}
          {/* <section className="content-inner overflow-hidden">
    <div className="container">
      <div className="row about-style1">
        <div className="col-lg-6 col-md-12 m-b30">
          <div
            className="about-thumb wow fadeInUp  position-relative"
            data-wow-delay="0.2s"
          >
            <div className="dz-media h-100">
              <img src="../../assets/user/images/women.png" alt="" />
            </div>
            <a
              href="shop-list.html"
              className="btn btn-outline-secondary btn-light btn-xl"
            >
              Bộ sưu tập phụ nữ
            </a>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 align-self-center">
          <div className="about-content">
            <div
              className="section-head style-1 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <h3 className="title ">
                Hãy sắm sửa tủ đồ của bạn với bộ sưu tập tuyệt vời của chúng tôi!
              </h3>
              <p>
                Lorem Ipsum đơn giản là văn bản giả của ngành in ấn và sắp chữ. Lorem Ipsum đã trở thành văn bản giả tiêu chuẩn của ngành kể từ khi
              </p>
            </div>
            <a
              className="service-btn-2 wow fadeInUp"
              data-wow-delay="0.6s"
              href="about-us.html"
            >
              <span className="icon-wrapper">
                <svg
                  width={44}
                  height={44}
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.832 31.1663L31.1654 12.833"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.832 12.833H31.1654V31.1663"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div
                  className="shop-card style-6 wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  <div className="dz-media">
                    <img src="../../assets/user/images/shop/product/medium/1.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <a
                      href="shop-list.html"
                      className="btn btn-outline-secondary btn-light btn-md"
                    >
                      Thời trang trẻ em
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div
                  className="shop-card style-6 wow fadeInUp"
                  data-wow-delay="1.0s"
                >
                  <div className="dz-media">
                    <img src="../../assets/user/images/shop/product/medium/2.png" alt="image" />
                  </div>
                  <div className="dz-content">
                    <a
                      href="shop-list.html"
                      className="btn btn-outline-secondary btn-light btn-md"
                    >
                      Bộ sưu tập đàn ông
                    </a>
                  </div>
                  <span className="sale-badge">
                    50%
                    <br />
                    Sale <img src="../../assets/user/images/star.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
          {/* About Section End */}
          {/* Dz Silder Start */}
          <section className="content-inner-3 overflow-hidden">
            <div className="dz-features-wrapper overflow-hidden">
              <ul className="dz-features text-wrapper">
                {(() => {
                  const ranks = Object.keys(salesRankCount || {});
                  if (ranks.length === 0) return null;

                  // nhân đôi danh sách để hiệu ứng slide liên tục
                  const loop = [...ranks, ...ranks];

                  const Separator = () => (
                    <li className="item" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width={61} height={60} viewBox="0 0 61 60" fill="none">
                        <path
                          opacity="0.3"
                          d="M29.302 -0.00499268L38.533 21.2005L60.3307 28.9297L39.1253 38.1607L31.396 59.9585L22.165 38.753L0.367297 31.0237L21.5728 21.7928L29.302 -0.00499268Z"
                          fill="black"
                        />
                      </svg>
                    </li>
                  );

                  return loop.map((rank, i) => (
                    <React.Fragment key={`cat-run-${i}-${rank}`}>
                      <li className="item">
                        <h2 className="title">
                          <a
                            href={`/user/shop/shopWithCategory?salesRank=${encodeURIComponent(rank)}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {rank}
                          </a>
                        </h2>
                      </li>
                      <Separator />
                    </React.Fragment>
                  ));
                })()}
              </ul>

            </div>
          </section>
          {/* Dz Silder End */}
          {/* Products Section Start */}


          {/* Products Section Start */}
          {/* Collection Section Start */}
          <section className="adv-area">
            <div className="container-fluid px-0">
              <div className="row product-style2 g-0">
                <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="product-box style-4">
                    <div
                      className="product-media"
                      style={{
                        backgroundImage: 'url("../../assets/user/images/shop/large/product1.png")'
                      }}
                    />
                    <div className="sale-box">
                      <div className="badge style-1 mb-1">
                        Giảm giá lên đến 50%
                        {/* Sale Up to 50% Off */}
                      </div>
                      <h2 className="sale-name">
                        Mùa hè<span>2023</span>
                      </h2>
                      <a
                        href="/user/shop/shopStandard"
                        className="btn btn-outline-secondary btn-lg text-uppercase"
                      >
                        {/* Shop Now */}
                        Mua ngay
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay="0.2s">
                  <div className="product-box style-4">
                    <div
                      className="product-media"
                      style={{
                        backgroundImage: 'url("../../assets/user/images/shop/large/product2.png")'
                      }}
                    />
                    <div className="product-content">
                      <div className="main-content">
                        <div className="badge style-1 mb-3">
                          Giảm giá lên đến 50%
                          {/* Sale Up to 50% Off */}
                        </div>
                        <h2 className="product-name">
                          Bộ sưu tập mùa hè mới
                          {/* New Summer Collection */}
                        </h2>
                      </div>
                      <a
                        href="/user/shop/shopStandard"
                        className="btn btn-secondary btn-lg text-uppercase"
                      >
                        Mua ngay
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Collection Section End */}
          {/* About Section Start */}
          {/* <section className="content-inner-2 overflow-hidden">
    <div className="container">
      <div className="row  align-items-xl-center align-items-start">
        <div className=" col-lg-5 col-md-12 m-b30 align-self-center">
          <div
            className="dz-media style-1 img-ho1 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <img src="../../assets/user/images/about/pic3.jpg" alt="image" />
          </div>
        </div>
        <div className="col-lg-7 col-md-12 col-sm-12">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-8 col-md-8 col-sm-12">
              <div
                className="section-head style-1 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <div className="left-content">
                  <h2 className="title">
                  Người dùng đã xem nội dung này cũng đã xem những hồ sơ tương tự này
                  </h2>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-4 col-sm-12 text-md-end wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <a
                className="icon-button d-md-block d-none ms-md-auto m-b30"
                href="/user/shop/shopStandard"
              >
                <div className="text-row word-rotate-box c-black">
                  <span className="word-rotate">
                    Tất cả sản phẩm -{" "}
                  </span>
                  <svg
                    className="badge__emoji"
                    xmlns="http://www.w3.org/2000/svg"
                    width={40}
                    height={40}
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_85_1327)">
                      <path
                        d="M31.3072 10.7239L39.5891 19.0059C39.8523 19.2696 40.0001 19.627 40.0001 19.9995C40.0001 20.3721 39.8523 20.7295 39.5891 20.9932L31.3072 29.2752C31.1236 29.4582 30.8748 29.5608 30.6156 29.5606C30.3564 29.5604 30.1078 29.4573 29.9245 29.274C29.7412 29.0907 29.6381 28.8422 29.6379 28.5829C29.6377 28.3237 29.7404 28.075 29.9234 27.8913L36.8368 20.9781L0.978516 20.9781C0.718997 20.9781 0.470108 20.875 0.2866 20.6915C0.103093 20.508 -1.17109e-07 20.2591 -1.14015e-07 19.9995C-1.1092e-07 19.74 0.103093 19.4911 0.2866 19.3076C0.470108 19.1241 0.718997 19.021 0.978516 19.021L36.8368 19.021L29.9234 12.1077C29.7404 11.9241 29.6377 11.6754 29.6379 11.4162C29.6381 11.1569 29.7412 10.9084 29.9245 10.7251C30.1078 10.5418 30.3564 10.4387 30.6156 10.4385C30.8748 10.4383 31.1236 10.5409 31.3072 10.7239Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_85_1327">
                        <rect
                          width={40}
                          height={40}
                          fill="white"
                          transform="matrix(-1.19249e-08 1 1 1.19249e-08 0 0)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 m-b15">
              <div
                className="shop-card style-5 wow fadeInUp"
                data-wow-delay="0.8s"
              >
                <div className="dz-media">
                  <img src="../../assets/user/images/shop/product-2/1.png" alt="image" />
                </div>
                <div className="dz-content">
                  <div>
                    <span className="sale-title">
                    giảm giá tới 79%
                      </span>
                    <h6 className="title">
                      <a href="shop-list.html">Cozy Knit Cardigan Sweater</a>
                    </h6>
                  </div>
                  <h6 className="price">
                    $80
                    <del>$95</del>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 m-b15">
              <div
                className="shop-card style-5 wow fadeInUp"
                data-wow-delay="1.0s"
              >
                <div className="dz-media">
                  <img src="../../assets/user/images/shop/product-2/2.png" alt="image" />
                </div>
                <div className="dz-content">
                  <div>
                    <span className="sale-title">up to 79% off</span>
                    <h6 className="title">
                      <a href="shop-list.html">Sophisticated Swagger Suit</a>
                    </h6>
                  </div>
                  <h6 className="price">
                    $80
                    <del>$95</del>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 m-b15">
              <div
                className="shop-card style-5 wow fadeInUp"
                data-wow-delay="1.2s"
              >
                <div className="dz-media">
                  <img src="../../assets/user/images/shop/product-2/3.png" alt="image" />
                </div>
                <div className="dz-content">
                  <div>
                    <span className="sale-title">up to 79% off</span>
                    <h6 className="title">
                      <a href="shop-list.html">Classic Denim Skinny Jeans</a>
                    </h6>
                  </div>
                  <h6 className="price">
                    $80
                    <del>$95</del>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
          {/* About Section End */}
          {/* About Section */}
          <section className="content-inner overflow-hidden p-b0">
            <div className="container">
              <div className="row ">
                <div className="col-lg-6 col-md-12 align-self-center">
                  <div className="row">
                    {(top5Products.length ? top5Products.slice(0, 4) : []).map((p, i) => {
                      const delays = ["0.2s", "0.3s", "0.4s", "0.6s"]; // giữ như template
                      const off = Number(p.discountPercent || 0);
                      const priceNew = priceAfterDiscount(p.price, off);
                      const name = p?.nameProduct || "";
                      const shortName = name.length > 28 ? name.slice(0, 28).trim() + "…" : name;

                      const thumb =
                        p?.thumbnail?.startsWith("http")
                          ? p.thumbnail
                          : p?.thumbnail
                            ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_600,h_600/imgProduct/IMG/${p.thumbnail}`
                            : "/assets/images/placeholder.png";

                      return (
                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30" key={p.asin || i}>
                          <div className="shop-card style-3 wow fadeInUp" data-wow-delay={delays[i] || "0.2s"}>
                            <div className="dz-media">
                              <img
                                src={thumb}
                                alt={shortName}
                              />
                            </div>

                            <div className="dz-content">
                              <div>
                                <span className={`sale-title ${off ? "" : "text-success"}`}>
                                  {off ? `Up to ${off}% Off` : "Free delivery"}
                                </span>
                                <h6 className="title">
                                  <a href={`/user/productstructure/ProductDetail?asin=${p.asin}`}>{shortName}</a>
                                </h6>
                              </div>
                              <h6 className="price">
                                {money(priceNew)} {off > 0 && <del>{money(p.price)}</del>}
                              </h6>
                            </div>
                            <span className="sale-badge">
                              {off ? `${off}%` : "Sale"}
                              {off ? <br /> : <><br /></>}
                              Sale <img src="../../assets/user/images/star.png" alt="star" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 m-b30">
                  <div className="about-box style-1  clearfix h-100 right">
                    <div className="dz-media h-100">
                      <img src="../../assets/user/images/about/pic1.jpg" alt="" />
                      <div className="media-contant">
                        <h2 className="title">
                          Tiết kiệm lớn cho các nhu yếu phẩm hàng ngày
                        </h2>
                        <h5 className="/user/shop/shopWithCategory">
                          Giảm giá tới 60% + Hoàn tiền lên tới 107 đô la
                        </h5>
                        <a href="/user/shop/shopStandard" className="btn btn-white btn-lg">
                          Xem Tất Cả
                        </a>
                      </div>
                      <svg className="title animation-text" viewBox="0 0 1320 300">
                        <text x={0} y="">
                          Tiết kiệm tuyệt vời
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* About Section */}
          {/* Map Area Start*/}
          <section className="content-inner-3 overflow-hidden" id="Maping">
            <div className="container-fluid p-0">
              <div className="row align-items-start">
                {/* LEFT MAP + 3 cards */}
                <div className="col-xl-7 col-lg-12 col-md-12">
                  <div className="map-area">
                    <img src="../../assets/user/images/map/map2.png" alt="image" />
                    <div className="map-line" id="map-line">
                      <img src="../../assets/user/images/map/map-line.png" alt="image" />
                    </div>

                    {/* các icon trang trí giữ nguyên */}
                    <div className="loction-b wow" data-wow-delay="0.2s">...svg...</div>
                    <div className="loction-center wow fadeInUp" data-wow-delay="1.0s">...svg...</div>
                    <div className="loction-a wow" data-wow-delay="1.2s">...svg...</div>

                    {/* ========== 3 ô nổi trên bản đồ: lấy top5Products[0..2] ========== */}
                    {top5Products.slice(0, 3).map((p, i) => {
                      const shortTitle =
                        p?.nameProduct ? p.nameProduct.split(" ").slice(0, 2).join(" ") + "..." : "";
                      const boxClass = ["area-box1", "area-box2", "area-box3"][i] || "area-box1";
                      return (
                        <div className={`${boxClass} wow`} data-wow-delay={`${1.4 + i * 0.2}s`} key={`mapbox-${p.asin || i}`}>
                          <div className="shop-card style-7">
                            <div className="dz-media">
                              <img
                                src={
                                  p?.thumbnail?.startsWith("http")
                                    ? p.thumbnail
                                    : p?.thumbnail
                                      ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${p.thumbnail}`
                                      : "/assets/images/placeholder.png"
                                }
                                alt={shortTitle || "product"}
                              />
                            </div>
                            <div className="dz-content">
                              <h5 className="title">
                                <a href={`/user/productstructure/ProductDetail?asin=${p.asin}`}>{shortTitle}</a>
                              </h5>
                              {Number(p.discountPercent || 0) > 0 && (
                                <span className="sale-title">
                                  Giảm đến {Number(p.discountPercent)}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT TITLE + SLIDER */}
                <div className="col-xl-5 col-lg-12 col-md-12 custom-width">
                  <div
                    className="section-head style-1 wow fadeInUp d-lg-flex align-items-end justify-content-between"
                    data-wow-delay="0.1s"
                  >
                    <div className="left-content">
                      <h2 className="title">Khám phá những điểm đến hấp dẫn nhất gần khu vực của bạn</h2>
                      <p className="text-capitalize text-secondary m-0">
                        Giảm giá tới 60% + Hoàn tiền lên tới 107 đô la
                      </p>
                    </div>
                    <a
                      href="/user/shop/shopWithCategory"
                      className="text-secondary font-14 d-flex align-items-center gap-1 m-b15"
                    >
                      Xem tất cả <i className="icon feather icon-chevron-right font-18" />
                    </a>
                  </div>

                  {/* clamp tên 2 dòng để không vỡ form */}
                  <style>{`
          #Maping .shop-card.style-7 .title a{
            display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;
            overflow:hidden;
          }
          #Maping .shop-card.style-7 .dz-media img{
            width:120px;height:120px;object-fit:cover;border-radius:12px;
          }
        `}</style>

                  <div className="swiper swiper-shop2 swiper-visible">
                    <div className="swiper-wrapper">
                      {(top5Products.length ? top5Products : []).map((p, idx) => {
                        const shortTitle =
                          p?.nameProduct ? p.nameProduct.split(" ").slice(0, 2).join(" ") + "..." : "";
                        return (
                          <div className="swiper-slide wow fadeInUp" data-wow-delay={`${0.1 + idx * 0.1}s`} key={`slide-${p.asin || idx}`}>
                            <div className="shop-card style-7">
                              <div className="dz-media">
                                <img
                                  src={
                                    p?.thumbnail?.startsWith("http")
                                      ? p.thumbnail
                                      : p?.thumbnail
                                        ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${p.thumbnail}`
                                        : "/assets/images/placeholder.png"
                                  }
                                  alt={shortTitle || "product"}
                                />
                              </div>
                              <div className="dz-content">
                                <h5 className="title">
                                  <a href={`/user/productstructure/ProductDetail?asin=${p.asin}`}>{shortTitle}</a>
                                </h5>
                                {Number(p.discountPercent || 0) > 0 && (
                                  <span className="sale-title">
                                    up to {Number(p.discountPercent)}% off
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Fallback giữ form nếu chưa có dữ liệu */}
                      {top5Products.length === 0 &&
                        [3, 4, 5, 6, 3].map((n, i) => (
                          <div className="swiper-slide wow fadeInUp" data-wow-delay={`${0.1 + i * 0.1}s`} key={`fallback-${i}`}>
                            <div className="shop-card style-7">
                              <div className="dz-media">
                                <img src={`../../assets/user/images/shop/product/medium/${n}.png`} alt="image" />
                              </div>
                              <div className="dz-content">
                                <h5 className="title"><a href="#">Loading...</a></h5>
                                <span className="sale-title">up to 79% off</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Blockbuster deal Start */}
          {/* <section className="content-inner-2 overflow-hidden">
    <div className="container">
      <div
        className="section-head style-1 wow fadeInUp d-lg-flex justify-content-between"
        data-wow-delay="0.2s"
      >
        <div className="left-content">
          <h2 className="title">
          Nổi bật bây giờ
          </h2>
        </div>
        <a
          href="shop-list.html"
          className="text-secondary font-14 d-flex align-items-center gap-1"
        >
          Xem tất cả ưu đãi
          <i className="icon feather icon-chevron-right font-18" />
        </a>
      </div>
      <div className="swiper swiper-four swiper-visible">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div
              className="shop-card style-2 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="dz-media">
                <img src="../../assets/user/images/shop/product/shart/1.png" alt="image" />
              </div>
              <div className="dz-content">
                <div>
                  <span className="sale-title">up to 79% off</span>
                  <h5 className="title">
                    <a href="shop-list.html">
                      Printed Spread Collar Casual Shirt
                    </a>
                  </h5>
                </div>
                <h6 className="price">
                  $80
                  <del>$95</del>
                </h6>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="shop-card style-2 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div className="dz-media">
                <img src="../../assets/user/images/shop/product/shart/2.png" alt="image" />
              </div>
              <div className="dz-content">
                <div>
                  <span className="sale-title">up to 79% off</span>
                  <h5 className="title">
                    <a href="shop-list.html">
                      Checkered Slim Collar Casual Shirt
                    </a>
                  </h5>
                </div>
                <h6 className="price">
                  $80
                  <del>$95</del>
                </h6>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="shop-card style-2 wow fadeInUp"
              data-wow-delay="0.8s"
            >
              <div className="dz-media">
                <img src="../../assets/user/images/shop/product/shart/3.png" alt="image" />
              </div>
              <div className="dz-content">
                <div>
                  <span className="sale-title">up to 79% off</span>
                  <h5 className="title">
                    <a href="shop-list.html">
                      Solid Cut Away Collar Casual Shirt
                    </a>
                  </h5>
                </div>
                <h6 className="price">
                  $80
                  <del>$95</del>
                </h6>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="shop-card style-2 wow fadeInUp"
              data-wow-delay="1.0s"
            >
              <div className="dz-media">
                <img src="../../assets/user/images/shop/product/shart/4.png" alt="image" />
              </div>
              <div className="dz-content">
                <div>
                  <span className="sale-title">up to 79% off</span>
                  <h5 className="title">
                    <a href="shop-list.html">
                      Printed Spread Collar Casual Shirt
                    </a>
                  </h5>
                </div>
                <h6 className="price">
                  $80
                  <del>$95</del>
                </h6>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="shop-card style-2 wow fadeInUp"
              data-wow-delay="1.2s"
            >
              <div className="dz-media">
                <img src="../../assets/user/images/shop/product/shart/5.png" alt="image" />
              </div>
              <div className="dz-content">
                <div>
                  <span className="sale-title">up to 79% off</span>
                  <h5 className="title">
                    <a href="shop-list.html">
                      Checkered Spread Collar Casual Shirt
                    </a>
                  </h5>
                </div>
                <h6 className="price">
                  $80
                  <del>$95</del>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
          {/* Blockbuster deal Start */}
          {/* Offer Section Start */}
          {/* <section className="content-inner-2">
    <div className="container">
      <div
        className="section-head style-1 wow fadeInUp d-flex justify-content-between m-b30"
        data-wow-delay="0.2s"
      >
        <div className="left-content">
          <h2 className="title">
          Ưu đãi nổi bật dành cho bạn
          </h2>
        </div>
        <a
          href="shop-list.html"
          className="text-secondary font-14 d-flex align-items-center gap-1"
        >
          Xem tất cả
          <i className="icon feather icon-chevron-right font-18" />
        </a>
      </div>
    </div>
    <div className="container-fluid px-3">
      <div className="swiper swiper-product">
        <div className="swiper-wrapper product-style2">
          <div className="swiper-slide">
            <div
              className="product-box style-2 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div
                className="product-media"
                style={{ backgroundImage: 'url("../../assets/user/images/clothes/1.png")' }}
              />
              <div className="product-content">
                <div className="main-content">
                  <span className="offer">
                  Giảm giá 20%
                  </span>
                  <h2 className="product-name">
                  Áo lót cao cấp
                  </h2>
                  <a
                    href="shop-list.html"
                    className="btn btn-outline-secondary btn-rounded btn-lg"
                  >
                    Thu thập ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="product-box style-2 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div
                className="product-media"
                style={{ backgroundImage: 'url("../../assets/user/images/clothes/2.png")' }}
              />
              <div className="product-content">
                <div className="main-content">
                  <span className="offer">
                  Giảm giá lên đến 50%
                  </span>
                  <h2 className="sub-title1">
                    Mùa hè <span className="year">2024</span>
                  </h2>
                  <a
                    href="shop-list.html"
                    className="btn btn-outline-secondary btn-rounded btn-lg"
                  >
                    Thu thập ngay                 
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="product-box style-2 wow fadeInUp"
              data-wow-delay="0.8s"
            >
              <div
                className="product-media"
                style={{ backgroundImage: 'url("../../assets/user/images/clothes/3.png")' }}
              />
              <div className="product-content">
                <div className="main-content">
                  <span className="offer">
                  Giảm giá 20%
                  </span>
                  <h2 className="sub-title2">
                  Đồ bơi
                    <span className="bg-title">
                    Doanh thu
                    </span>
                  </h2>
                  <a
                    href="shop-list.html"
                    className="btn btn-outline-secondary btn-rounded btn-lg"
                  >
                    Thu thập ngay                  
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="product-box style-2 wow fadeInUp"
              data-wow-delay="1.0s"
            >
              <div
                className="product-media"
                style={{ backgroundImage: 'url("../../assets/user/images/clothes/1.png")' }}
              />
              <div className="product-content">
                <div className="main-content">
                  <span className="offer">
                  Giảm giá 20%
                  </span>
                  <h2 className="product-name">
                  Áo lót cao cấp
                  </h2>
                  <a
                    href="shop-list.html"
                    className="btn btn-outline-secondary btn-rounded btn-lg"
                  >
                    Thu thập ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="product-box style-2 wow fadeInUp"
              data-wow-delay="1.2s"
            >
              <div
                className="product-media"
                style={{ backgroundImage: 'url("../../assets/user/images/clothes/2.png")' }}
              />
              <div className="product-content">
                <div className="main-content">
                  <span className="offer">Sale Up to 50% Off</span>
                  <h2 className="sub-title1">
                    Summer <span className="year">2024</span>
                  </h2>
                  <a
                    href="shop-list.html"
                    className="btn btn-outline-secondary btn-rounded btn-lg"
                  >
                    Collect Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="product-box style-2 wow fadeInUp"
              data-wow-delay="1.4s"
            >
              <div
                className="product-media"
                style={{ backgroundImage: 'url("../../assets/user/images/clothes/3.png")' }}
              />
              <div className="product-content">
                <div className="main-content">
                  <span className="offer">20% Off</span>
                  <h2 className="sub-title2">
                    Swimwear<span className="bg-title">Sale</span>
                  </h2>
                  <a
                    href="shop-list.html"
                    className="btn btn-outline-secondary btn-rounded btn-lg"
                  >
                    Collect Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
          {/* Product End */}
          {/* Featured Section Start */}
          <section className="content-inner overflow-hidden">
            <div className="container">
              <div
                className="section-head style-1 wow fadeInUp d-flex justify-content-between"
                data-wow-delay="0.2s"
              >
                <div className="left-content">
                  <h2 className="title">Ưu đãi bom tấn</h2>
                </div>

                <a
                  href="/user/shop/shopWithCategory"
                  className="text-secondary font-14 d-flex align-items-center gap-1"
                >
                  Xem Tất Cả
                  <i className="icon feather icon-chevron-right font-18" />
                </a>
              </div>

              {/* style nhỏ để giữ form/size card giống template */}
              <style>{`
      .hp-featured-swiper .shop-card.style-4 { min-height: 150px; }
      .hp-featured-swiper .dz-media img {
        width: 120px; height: 120px; object-fit: cover; border-radius: 12px;
      }
      .hp-featured-swiper .title {
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        overflow: hidden; min-height: 44px; line-height: 1.15;
      }
      .hp-featured-swiper .sale-title { font-size: 12px; color: #ff4d4f; }
      .hp-featured-swiper .price del { margin-left: 6px; opacity: .6; }
    `}</style>

              <div className="swiper swiper-product2 swiper-visible hp-featured-swiper">
                <div className="swiper-wrapper">
                  {top5Products.slice(0, 5).map((p, i) => {
                    const shortTitle =
                      p?.nameProduct
                        ? p.nameProduct.split(" ").slice(0, 2).join(" ") + "..."
                        : "";

                    const after = (Number(p.price || 0) * (1 - Number(p.discountPercent || 0) / 100)).toFixed(2);

                    return (
                      <div className="swiper-slide" key={p.asin || i}>
                        <div className="shop-card style-4 wow fadeInUp" data-wow-delay={`${0.4 + i * 0.2}s`}>
                          <div className="dz-media">
                            <img
                              src={
                                p?.thumbnail?.startsWith("http")
                                  ? p.thumbnail
                                  : p?.thumbnail
                                    ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${p.thumbnail}`
                                    : "/assets/images/placeholder.png"
                              }
                              alt={p?.nameProduct || "product"}
                            />
                          </div>

                          <div className="dz-content">
                            <div>
                              <h6 className="title">
                                <a href={`/user/productstructure/ProductDetail?asin=${p.asin}`}>
                                  {shortTitle}
                                </a>
                              </h6>

                              {Number(p.discountPercent || 0) > 0 && (
                                <span className="sale-title">Up to {p.discountPercent}% Off</span>
                              )}
                            </div>

                            <div className="d-flex align-items-center">
                              <h6 className="price mb-0">
                                ${after}
                                {Number(p.discountPercent || 0) > 0 && <del>${Number(p.price || 0).toFixed(2)}</del>}
                              </h6>
                              <span className="review ms-2">
                                <i className="fa-solid fa-star" /> (2k Review)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* fallback giữ form nếu chưa có dữ liệu */}
                  {top5Products.length === 0 &&
                    [1, 2, 3, 4, 5].map((n, i) => (
                      <div className="swiper-slide" key={`skeleton-${i}`}>
                        <div className="shop-card style-4 wow fadeInUp" data-wow-delay={`${0.4 + i * 0.2}s`}>
                          <div className="dz-media">
                            <img src={`../../assets/user/images/shop/product/${((i % 3) + 1)}.png`} alt="image" />
                          </div>
                          <div className="dz-content">
                            <div>
                              <h6 className="title"><a href="#">Loading...</a></h6>
                              <span className="sale-title">Up to 40% Off</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <h6 className="price">$80<del>$95</del></h6>
                              <span className="review"><i className="fa-solid fa-star" />(2k Review)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>

          {/* Featured Section End */}
          {/* About Section */}
          {/* <section className="content-inner overflow-hidden p-b0">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-12 m-b30">
          <div
            className="about-box style-1 wow fadeInUp  clearfix h-100"
            data-wow-delay="0.2s"
          >
            <div className="dz-media h-100">
              <img src="../../assets/user/images/about/pic2.jpg" alt="" />
              <div className="media-contant">
                <h2 className="title">
                Những bổ sung gần đây vào danh sách rút gọn của bạn
                </h2>
                <a href="shop-list.html" className="btn btn-white">
                Mua ngay
                </a>
              </div>
              <svg className="title animation-text" viewBox="0 0 1320 300">
                <text x={0} y="">
                  Danh sách rút gọn
                </text>
              </svg>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 align-self-center">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
              <div
                className="shop-card style-3 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <div className="dz-media">
                  <img src="../../assets/user/images/shop/product-2/1.png" alt="image" />
                </div>
                <div className="dz-content">
                  <div>
                    <span className="sale-title">up to 79% off</span>
                    <h6 className="title">
                      <a href="shop-list.html">Cozy Knit Cardigan Sweater</a>
                    </h6>
                  </div>
                  <h6 className="price">
                    $80
                    <del>$95</del>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
              <div
                className="shop-card style-3 wow fadeInUp"
                data-wow-delay="0.6s"
              >
                <div className="dz-media">
                  <img src="../../assets/user/images/shop/product-2/2.png" alt="image" />
                </div>
                <div className="dz-content">
                  <div>
                    <span className="sale-title">up to 79% off</span>
                    <h6 className="title">
                      <a href="shop-list.html">Sophisticated Swagger Suit</a>
                    </h6>
                  </div>
                  <h6 className="price">
                    $80
                    <del>$95</del>
                  </h6>
                </div>
                <span className="sale-badge">
                  50%
                  <br />
                  Sale <img src="../../assets/user/images/star.png" alt="" />
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
              <div
                className="shop-card style-3 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <div className="dz-media">
                  <img src="../../assets/user/images/shop/product-2/3.png" alt="image" />
                </div>
                <div className="dz-content">
                  <div>
                    <span className="sale-title">up to 79% off</span>
                    <h6 className="title">
                      <a href="shop-list.html">Classic Denim Skinny Jeans</a>
                    </h6>
                  </div>
                  <h6 className="price">
                    $80
                    <del>$95</del>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
              <div
                className="shop-card style-3 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="dz-media">
                  <img src="../../assets/user/images/shop/product-2/4.png" alt="image" />
                </div>
                <div className="dz-content">
                  <div>
                    <span className="sale-title">up to 79% off</span>
                    <h6 className="title">
                      <a href="shop-list.html">Athletic Mesh Sports Leggings</a>
                    </h6>
                  </div>
                  <h6 className="price">
                    $80
                    <del>$95</del>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
          {/* About Section */}
          {/* company-box Start */}
          {/* <section className="content-inner-2">
    <div className="container">
      <div
        className="section-head style-1 wow fadeInUp d-flex  justify-content-between"
        data-wow-delay="0.2s"
      >
        <div className="left-content">
          <h2 className="title">
          Được tài trợ
          </h2>
        </div>
        <a
          href="shop-list.html"
          className="text-secondary font-14 d-flex align-items-center gap-1"
        >
          Xem tất cả
          <i className="icon feather icon-chevron-right font-18" />
        </a>
      </div>
      <div className="swiper swiper-company">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div
              className="company-box style-1 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="dz-media">
                <img
                  src="../../assets/user/images/company/1.jpg"
                  alt="image"
                  className="company-img"
                />
                <img
                  src="../../assets/user/images/company/logo/logo1.png"
                  alt="image"
                  className="logo"
                />
              </div>
              <div className="dz-content">
                <h6 className="title">Outdoor Shoes </h6>
                <span className="sale-title">Min. 30% Off</span>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="company-box style-1 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div className="dz-media">
                <img
                  src="../../assets/user/images/company/2.jpg"
                  alt="image"
                  className="company-img"
                />
                <img
                  src="../../assets/user/images/company/logo/logo2.png"
                  alt="image"
                  className="logo"
                />
                <span className="sale-badge">in Store</span>
              </div>
              <div className="dz-content">
                <h6 className="title">Best Cloths</h6>
                <span className="sale-title">Up To 20% Off</span>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="company-box style-1 wow fadeInUp"
              data-wow-delay="0.8s"
            >
              <div className="dz-media">
                <img
                  src="../../assets/user/images/company/1.jpg"
                  alt="image"
                  className="company-img"
                />
                <img
                  src="../../assets/user/images/company/logo/logo3.png"
                  alt="image"
                  className="logo"
                />
              </div>
              <div className="dz-content">
                <h6 className="title">Sports Shoes</h6>
                <span className="sale-title">up to 30% Off</span>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="company-box style-1 wow fadeInUp"
              data-wow-delay="1.0s"
            >
              <div className="dz-media">
                <img
                  src="../../assets/user/images/company/3.jpg"
                  alt="image"
                  className="company-img"
                />
                <img
                  src="../../assets/user/images/company/logo/logo4.png"
                  alt="image"
                  className="logo"
                />
                <span className="sale-badge">in Store</span>
              </div>
              <div className="dz-content">
                <h6 className="title">modern jewellery</h6>
                <span className="sale-title">Min. 30% Off</span>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="company-box style-1 wow fadeInUp"
              data-wow-delay="1.2s"
            >
              <div className="dz-media">
                <img
                  src="../../assets/user/images/company/1.jpg"
                  alt="image"
                  className="company-img"
                />
                <img
                  src="../../assets/user/images/company/logo/logo1.png"
                  alt="image"
                  className="logo"
                />
              </div>
              <div className="dz-content">
                <h6 className="title">Outdoor Shoes </h6>
                <span className="sale-title">Min. 30% Off</span>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="company-box style-1 wow fadeInUp"
              data-wow-delay="1.4s"
            >
              <div className="dz-media">
                <img
                  src="../../assets/user/images/company/2.jpg"
                  alt="image"
                  className="company-img"
                />
                <img
                  src="../../assets/user/images/company/logo/logo2.png"
                  alt="image"
                  className="logo"
                />
                <span className="sale-badge">in Store</span>
              </div>
              <div className="dz-content">
                <h6 className="title">Best Cloths</h6>
                <span className="sale-title">Up To 20% Off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
          {/* company-box End */}
          {/* Blog Start */}
          {/* <section className="content-inner-3 overflow-hidden p-b0">
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div
            className="section-head style-2 m-0 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="left-content">
              <h2 className="title">
              Khám phá bài đăng thịnh hành nhất trên Pixio.
              </h2>
            </div>
          </div>
        </div>
        <div
          className="col-lg-6 col-md-4 col-sm-12 text-md-end m-b30 wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <a
            className="icon-button d-md-inline-block d-none"
            href="shop-standard.html"
          >
            <div className="text-row word-rotate-box c-black">
              <span className="word-rotate">Tin tức mới nhất -</span>
              <svg
                className="badge__emoji"
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clipPath="url(#clip0_85_881)">
                  <path
                    d="M31.3072 10.7239L39.5891 19.0059C39.8523 19.2696 40.0001 19.627 40.0001 19.9995C40.0001 20.3721 39.8523 20.7295 39.5891 20.9932L31.3072 29.2752C31.1236 29.4582 30.8748 29.5608 30.6156 29.5606C30.3564 29.5604 30.1078 29.4573 29.9245 29.274C29.7412 29.0907 29.6381 28.8422 29.6379 28.5829C29.6377 28.3237 29.7404 28.075 29.9234 27.8913L36.8368 20.9781L0.978516 20.9781C0.718997 20.9781 0.470108 20.875 0.2866 20.6915C0.103093 20.508 -1.17109e-07 20.2591 -1.14015e-07 19.9995C-1.1092e-07 19.74 0.103093 19.4911 0.2866 19.3076C0.470108 19.1241 0.718997 19.021 0.978516 19.021L36.8368 19.021L29.9234 12.1077C29.7404 11.9241 29.6377 11.6754 29.6379 11.4162C29.6381 11.1569 29.7412 10.9084 29.9245 10.7251C30.1078 10.5418 30.3564 10.4387 30.6156 10.4385C30.8748 10.4383 31.1236 10.5409 31.3072 10.7239Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_85_881">
                    <rect
                      width={40}
                      height={40}
                      fill="white"
                      transform="matrix(-1.19249e-08 1 1 1.19249e-08 0 0)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div className="swiper swiper-blog-post">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="dz-card style-2 wow fadeInUp" data-wow-delay="0.2s">
            <div className="dz-media">
              <img src="../../assets/user/images/blog/grid/1.jpg" alt="" />
              <div className="post-date">17 May 2023</div>
            </div>
            <div className="dz-info">
              <h4 className="dz-title mb-0">
                <a href="blog-light-3-column.html">
                  Style Diaries: A Week in Fashion
                </a>
              </h4>
              <ul className="blog-social">
                <li>
                  <a className="share-btn" href="javascript:void(0);">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17L17 7"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7H17V17"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <ul className="sub-team-social">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="dz-card style-2 wow fadeInUp" data-wow-delay="0.4s">
            <div className="dz-media">
              <img src="../../assets/user/images/blog/grid/2.jpg" alt="" />
              <div className="post-date">28 Feb 2023</div>
            </div>
            <div className="dz-info">
              <h4 className="dz-title mb-0">
                <a href="blog-light-3-column.html">
                  Chic &amp; Unique: Personalized Fashion Finds
                </a>
              </h4>
              <ul className="blog-social">
                <li>
                  <a className="share-btn" href="javascript:void(0);">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17L17 7"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7H17V17"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <ul className="sub-team-social">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="dz-card style-2 wow fadeInUp" data-wow-delay="0.6s">
            <div className="dz-media">
              <img src="../../assets/user/images/blog/grid/3.jpg" alt="" />
              <div className="post-date">15 Aug 2023</div>
            </div>
            <div className="dz-info">
              <h4 className="dz-title mb-0">
                <a href="blog-light-3-column.html">
                  Dress to Impress: Elevate Your Everyday Style
                </a>
              </h4>
              <ul className="blog-social">
                <li>
                  <a className="share-btn" href="javascript:void(0);">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17L17 7"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7H17V17"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <ul className="sub-team-social">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="dz-card style-2 wow fadeInUp" data-wow-delay="0.8s">
            <div className="dz-media">
              <img src="../../assets/user/images/blog/grid/4.jpg" alt="" />
              <div className="post-date">28 Nov 2023</div>
            </div>
            <div className="dz-info">
              <h4 className="dz-title mb-0">
                <a href="blog-light-3-column.html">
                  Street Style Safari: Global Fashion Influences
                </a>
              </h4>
              <ul className="blog-social">
                <li>
                  <a className="share-btn" href="javascript:void(0);">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17L17 7"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7H17V17"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <ul className="sub-team-social">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="dz-card style-2 wow fadeInUp" data-wow-delay="1.0s">
            <div className="dz-media">
              <img src="../../assets/user/images/blog/grid/5.jpg" alt="" />
              <div className="post-date">13 Feb 2023</div>
            </div>
            <div className="dz-info">
              <h4 className="dz-title mb-0">
                <a href="blog-light-3-column.html">
                  Fashion &amp; Beauty Fusion: The Ultimate Style Guide
                </a>
              </h4>
              <ul className="blog-social">
                <li>
                  <a className="share-btn" href="javascript:void(0);">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17L17 7"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7H17V17"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <ul className="sub-team-social">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="dz-card style-2 wow fadeInUp" data-wow-delay="0.2s">
            <div className="dz-media">
              <img src="../../assets/user/images/blog/grid/1.jpg" alt="" />
              <div className="post-date">17 May 2023</div>
            </div>
            <div className="dz-info">
              <h4 className="dz-title mb-0">
                <a href="blog-light-3-column.html">
                  Style Diaries: A Week in Fashion
                </a>
              </h4>
              <ul className="blog-social">
                <li>
                  <a className="share-btn" href="javascript:void(0);">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17L17 7"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7H17V17"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <ul className="sub-team-social">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
          {/* Blog End */}
          {/* collection-bx */}
          <section className="collection-bx content-inner-3 overflow-hidden">
            <div className="container">
              <h2 className="title wow fadeInUp" data-wow-delay="0.2s">
                Nâng cấp phong cách của bạn với bộ sưu tập hàng đầu của chúng tôi.
                {/* Upgrade your style with our top-notch collection. */}
              </h2>
              <div className="text-center">
                <a
                  href="/user/shop/shopStandard"
                  className="btn btn-secondary btn-lg wow fadeInUp m-b30"
                  data-wow-delay="0.4s"
                >
                  Tất cả bộ sưu tập
                  {/* All Collections */}
                </a>
              </div>
            </div>
            <div className="collection1">
              <img src="../../assets/user/images/collection/1.png" alt="" />
            </div>
            <div className="collection2">
              <img src="../../assets/user/images/collection/2.png" alt="" />
            </div>
            <div className="collection3">
              <img src="../../assets/user/images/collection/3.png" alt="" />
            </div>
            <div className="collection4">
              <img src="../../assets/user/images/collection/4.png" alt="" />
            </div>
            <div className="collection5">
              <img src="../../assets/user/images/collection/5.png" alt="" />
            </div>
          </section>
          {/* collection-bx */}
        </div>


        {/* Footer (đã được xử lý trong App.js) */}
        <ScrollTopButton />
        <QuickViewModal
          product={selectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          availableStock={availableStock}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          onAdd={(q, picked) => addCartFromModal(q, picked)}
          onToggleWishlist={() => selectedProduct && handleToggleWishlist(selectedProduct.asin)}
          inWishlist={isProductInWishlist?.(selectedProduct?.asin)}
          triggerToast={triggerToast}
          soldCount={selectedProduct?.soldCount}
          requireSelection
        />
        {showToast && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            padding: '12px 20px',
            backgroundColor: '#4caf50', // xanh lá cho thành công
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}>
            {toastMessage}
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;