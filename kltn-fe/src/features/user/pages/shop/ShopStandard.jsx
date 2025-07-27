// src/pages/common/HomePage.js
import React, { useCallback, useEffect,useRef, useState } from 'react';
import { Helmet } from 'react-helmet'; 
// import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js
import axios from 'axios';
import { param } from 'jquery';
import { type } from '@testing-library/user-event/dist/type';

function ShopStandard({products }) {
	 const [hasBgClass, setHasBgClass] = useState(true);
  const [product, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const maxPagesToShow = 10;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [listCart, setListCart] = useState([]);
  const [salesRankCount, setSalesRankCount] = useState([]);
  const [productTypeCount, setProductTypeCount] = useState([]);
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(400);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [searchAsin, setSearchAsin] = useState([]);
  const [availableStock, setAvailableStock] = useState(null);
  const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');
const [toastType, setToastType] = useState('success'); // hoặc "error"

// ✅ Đổi tên hàm showToast → triggerToast
const triggerToast = (msg, type = "success") => {
  setToastMessage(msg);
  setToastType(type);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 1500);
};
  useEffect(() => {
    const modalEl = document.getElementById('exampleModal');
  
    const handleHidden = () => {
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    };
    modalEl?.addEventListener('hidden.bs.modal', handleHidden);
    return () => {
      modalEl?.removeEventListener('hidden.bs.modal', handleHidden);
    };
  }, []);
const toggleClickSearchAsin = (asin) => {
  setSearchAsin((prev) => {
    if (!prev.includes(asin)) {
      return [...prev, asin];
    }
    return prev;
  });
};

// API Thanh search tiền
useEffect(() => {
  const interval = setInterval(() => {
    const slider = document.getElementById("slider-tooltips2");
    if (slider && slider.noUiSlider) {
      slider.noUiSlider.on("change", async (values) => {
        const [min, max] = values.map(Number);
        console.log("🎯 Min Price:", min, "| Max Price:", max);
        setMinValue(min); // ✅ Gọi hàm setState đúng cách
        setMaxValue(max);
      });

      clearInterval(interval); // dừng polling sau khi gắn xong
    }
  }, 100);

  return () => clearInterval(interval);
}, []);

  // Hàm debounce
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
const handleTagToggle = (tag) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag) // Xóa tag nếu đã có
        : [...prev, tag]; // Thêm tag nếu chưa có
      return newTags;
    });
    setCurrentPage(0); // Reset về trang đầu khi thay đổi tag
  };
const fetchProductsData = useCallback(
    async (page, size, searchTerm = '', minPrice = null, maxPrice = null, tags = []) => {
      setLoading(true);
      try {
        const params = {
          page,
          size,
        };
   
        // Thêm các tham số nếu có giá trị
        if (searchTerm.trim() !== '') {
          params.keyword = searchTerm;
        }
        if (minValue !== '' && minValue !== null && !isNaN(minValue)) {
          params.minPrice = Number(minPrice);
        }
        if (maxValue !== '' && maxValue !== null && !isNaN(maxValue)) {
          params.maxPrice = Number(maxValue);
        }
        if (tags.length > 0) {
          params.tags = tags.join(','); 
        }

        const response = await axios.get('http://localhost:8085/api/search/searchAdvance', {
          params,
        });

        console.log('🔍 Input:', { searchTerm, minPrice, maxPrice, tags });
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('❌ Lỗi khi lấy sản phẩm:', error);
        setProducts([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    },
    [] // Không cần dependencies vì các state được truyền trực tiếp qua tham số
  );
  const debouncedSetKeyword = useCallback(
    debounce((value) => {
      setKeyword(value);
      setCurrentPage(0);
    }, 500),
    []
  );
const handleInputChangeSearch = (e) => {
  const value = e.target.value;
  setInputValue(value);         // cập nhật tức thì cho input
  debouncedSetKeyword(value);   // cập nhật từ khóa sau 500ms
};
  useEffect(() => {
    fetchProductsData(currentPage, pageSize, keyword, minValue, maxValue, selectedTags);
  }, [currentPage, pageSize, keyword, minValue, maxValue, selectedTags, fetchProductsData]);
  const handleSearchAsin = async (asin) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post('http://localhost:8088/api/recommend/saveRecommendHistory', {
           accessToken: accessToken,
          asin: asin,
      });
    }catch (error) {
      console.error(error);
    }
  }

  const getAllCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/products/getAllCategories');
      setSalesRankCount(response.data.salesRankCount);
      setProductTypeCount(response.data.productTypeCount);
      setTags(response.data.tags);
    } catch (error) {
      console.error('Không lấy được danh mục:', error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const discount = selectedProduct.percentDiscount || 0;
      const unitPrice = selectedProduct.productPrice || 0;
      const discountedPrice = unitPrice - (unitPrice * discount / 100);
  
      setPriceDiscount(discountedPrice.toFixed(2));
    } else {
      setPriceDiscount("0.00");
    }
  }, [selectedProduct]);

  const addCart = async () => {
    const cartId = localStorage.getItem("cartId") || "";
    const token = localStorage.getItem("accessToken") || "";
  
    // ⚠️ Kiểm tra lựa chọn
    if (selectedProduct?.sizes?.length > 0 && !selectedSize) {
      triggerToast("⚠️ Vui lòng chọn size.", "error");
      return;
    }
  
    if (selectedProduct?.colorAsin && !selectedColor) {
      triggerToast("⚠️ Vui lòng chọn màu.", "error");
      return;
    }
  
    // ❗ Kiểm tra tồn kho
    if (availableStock === 0) {
      triggerToast("❌ Sản phẩm này đã hết hàng.", "error");
      return;
    }
  
    if (quantity > availableStock) {
      triggerToast(`⚠️ Chỉ còn ${availableStock} sản phẩm có sẵn.`, "error");
      return;
    }
  
    try {
      const payload = {
        token,
        asin: selectedProduct.asin,
        quantity,
        price: parseFloat(priceDiscount),
        cartId,
        size: selectedSize?.sizeName || null,
        nameColor: selectedColor?.name_color || null,
        colorAsin: JSON.stringify(selectedProduct.colors || []),
      };
  
      const response = await axios.post("http://localhost:8084/api/cart/addCart", payload);
  
      if (response.data.cartId) {
        localStorage.setItem("cartId", response.data.cartId);
      }
  
      window.dispatchEvent(new Event("cartUpdated"));
      triggerToast("✅ Thêm vào giỏ hàng thành công!", "success");
  
      // 👉 Chuyển sang giỏ hàng
      window.location.href = "/user/shoppages/cart";
    } catch (error) {
      console.error("❌ Không thể thêm giỏ hàng:", error.response?.data || error.message);
      triggerToast("❌ Thêm giỏ hàng thất bại!", "error");
    }
  }; 
  const addCartWithQuantity = async (quantity, product) => {
    const cartId = localStorage.getItem("cartId") || "";
    const token = localStorage.getItem("accessToken") || "";
  
    try {
      const payload = {
        token,
        asin: product.asin,
        quantity,
        price: parseFloat(product.productPrice),
        cartId,
      };
  
      const response = await axios.post("http://localhost:8084/api/cart/addCart", payload);
  
      if (response.data.cartId) {
        localStorage.setItem("cartId", response.data.cartId);
      }
  
      window.dispatchEvent(new Event("cartUpdated"));
      triggerToast("✅ Thêm vào giỏ hàng thành công!");      
    } catch (error) {
      console.error("❌ Không thể thêm giỏ hàng (from outside):", error.response?.data || error.message);
      triggerToast("❌ Thêm giỏ hàng thất bại!", "error");
    }
  };
  const getCartProduct = async () => {
    const cartId = localStorage.getItem("cartId") || "";
    const token = localStorage.getItem("accessToken") || "";
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

  const isProductInCart = (asin) => {
    return listCart.some((item) => item.asin === asin);
  };

  const fetchWishlist = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:8083/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(res.data);
    } catch (error) {
      console.error("❌ Lỗi lấy wishlist:", error);
    }
  };
  useEffect(() => {
    const handleWishlistUpdated = () => {
      fetchWishlist();
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdated);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdated);
  }, []);

  const handleChange = (e) => {
    let value = parseInt(e.target.value);
  
    if (isNaN(value) || value < 1) {
      alert("❌ Số lượng phải lớn hơn hoặc bằng 1.");
      value = 1;
    }
  
    if (availableStock !== null && value > availableStock) {
      alert(`⚠️ Chỉ còn tối đa ${availableStock} sản phẩm trong kho.`);
      value = availableStock;
    }
  
    setQuantity(value);
  };
  

  const scrollToFilterWrapper = () => {
    const filterWrapper = document.querySelector(".filter-wrapper");
    if (filterWrapper) {
      filterWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      scrollToFilterWrapper();
    }
  };

  const handlePageChangeProduct = (event) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    setCurrentPage(0);
    scrollToFilterWrapper();
  };

  const getPageRange = () => {
    const startPage = Math.floor(currentPage / maxPagesToShow) * maxPagesToShow;
    const endPage = Math.min(startPage + maxPagesToShow, totalPages);
    return [...Array(endPage - startPage).keys()].map((i) => startPage + i);
  };

  useEffect(() => {
    if (hasBgClass) {
      document.body.classList.add("bg");
    } else {
      document.body.classList.remove("bg");
    }
    return () => {
      document.body.classList.remove("bg");
    };
  }, [hasBgClass]);

  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  useEffect(() => {
    const modalElement = document.getElementById("exampleModal");
    const handleModalClose = () => {
      setQuantity(1);
      setPriceDiscount(0);
    };
    if (modalElement) {
      modalElement.addEventListener("hidden.bs.modal", handleModalClose);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
      }
    };
  }, []);

  const handleToggleWishlist = async (asin) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
  
    const isInWishlist = wishlistItems.some((item) => item.asin === asin);
    try {
      if (isInWishlist) {
        await axios.delete(`http://localhost:8083/api/wishlist/${asin}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        triggerToast("🗑️ Đã xóa sản phẩm khỏi wishlist");
      } else {
        await axios.post(`http://localhost:8083/api/wishlist/${asin}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        triggerToast("🗑️ Đã thêm sản phẩm vào wishlist");
      }
  
      const res = await axios.get("http://localhost:8083/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(res.data);
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("❌ Lỗi cập nhật wishlist:", error);
    }
  };
  const isProductInWishlist = (asin) => wishlistItems.some((item) => item.asin === asin);

  const imageWrapperStyle = { width: "600px", height: "450px" };
  // Api gọi số lượng dựa vào màu và size
  useEffect(() => {
    if (!selectedProduct) return;
  
    // Nếu chưa chọn cả size hoặc color → hiển thị tồn kho tổng từ bảng product
    if (!selectedSize || !selectedColor) {
      setAvailableStock(selectedProduct.stockQuantity || 0);
      return;
    }
  
    // Nếu đã chọn đầy đủ → gọi API để lấy tồn kho variant
    const fetchAvailableStock = async () => {
      try {
        const res = await fetch(
          `http://localhost:8083/api/product-variants/available-stock?productId=${selectedProduct.productId}&sizeId=${selectedSize.sizeId}&colorId=${selectedColor.colorId}`
        );
  
        if (!res.ok) throw new Error("Failed to fetch variant stock");
  
        const quantity = await res.json();
        setAvailableStock(quantity);
        setQuantity((q) => Math.min(q, quantity)); // Không cho nhập vượt
      } catch (err) {
        console.error("❌ Error fetching variant stock:", err);
        setAvailableStock(null);
      }
    };
  
    fetchAvailableStock();
  }, [selectedProduct, selectedSize, selectedColor]);
  
  // Xem chi tiết sp
  const fetchProductDetail = async (asin) => {
    try {
      const res = await axios.get(`http://localhost:8083/api/products/productDetail/${asin}`);
      setSelectedProduct(res.data);
    } catch (err) {
      console.error("❌ Lỗi lấy chi tiết sản phẩm:", err);
    }
  };
  
  return (
    <>
      <div className="page-wraper">
        {/* Header (đã được xử lý trong App.js) */}
        <div className="page-content bg-light">
  {/*Banner Start*/}
  <div
    className="dz-bnr-inr bg-secondary overlay-black-light"
    style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}
  >
    <div className="container">
      <div className="dz-bnr-inr-entry">
        <h1>
        Cửa hàng tiêu chuẩn
          {/* Shop Standard */}
        </h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Trang chủ</a>
            </li>
            <li className="breadcrumb-item">Cửa hàng tiêu chuẩn</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {/*Banner End*/}
  <section className="content-inner-3 pt-3 z-index-unset">
    <div className="container-fluid">
      <div className="row">
        <div className="col-20 col-xl-3">
          <div className="sticky-xl-top">
            <a href="javascript:void(0);" className="panel-close-btn">
              <svg
                width={35}
                height={35}
                viewBox="0 0 51 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37.748 12.5L12.748 37.5"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.748 12.5L37.748 37.5"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
                <div className="widget widget_search">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="dzSearch"
                        value={inputValue} // bind giá trị trực tiếp
                        onChange={handleInputChangeSearch}
                        required="required"
                        type="search"
                        className="form-control"
                        placeholder="Search Product"
                      />
                      <div className="input-group-addon">
                        <button
                          name="submit"
                          value="Submit"
                          type="submit"
                          className="btn"
                        >
                          <i className="icon feather icon-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget">
                  <h6 className="widget-title">Giá</h6>
                  <div className="price-slide range-slider">
                    <div className="price">
                      <div className="range-slider style-1">
                        <div id="slider-tooltips2" className="mb-3" />
                        <span
                          className="example-val"
                          id="slider-margin-value-min2"
                        />
                        <span
                          className="example-val"
                          id="slider-margin-value-max2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                       <div className="widget widget_categories">
                          <h6 className="widget-title">Danh mục</h6>
                  <ul>
                {Object.entries(salesRankCount).map(([type, count]) => (

                    <li className="cat-item cat-item-26">
                      <a href={`/user/shop/shopWithCategory?salesRank=${type}`}>{type}</a> ({count})
                    </li>


                ))}
                       </ul>
                         </div>
                 <div className="widget widget_categories">
                  <h6 className="widget-title">Loại</h6>
                  <ul>
                       {Object.entries(productTypeCount).map(([type, count]) => (
                    <li className="cat-item cat-item-26">
                      <a href={`/user/shop/shopWithCategory?productType=${type}`}>{type}</a> ({count})
                    </li>
                ))}


                  </ul>
                </div>
              {/* Tag Cloud */}
      <div className="widget widget_tag_cloud" >
        <h6 className="widget-title">Tags</h6>
        <div className="tagcloud">
          {Object.entries(tags).length > 0 ? (
            Object.entries(tags).map(([type, count]) => (
            <span
  key={type}
  onClick={() => handleTagToggle(type)}
  onMouseEnter={(e) => {
    if (!selectedTags.includes(type)) {
      e.currentTarget.style.backgroundColor = '#000';
      e.currentTarget.style.color = '#fff';
    }
  }}
  onMouseLeave={(e) => {
    if (!selectedTags.includes(type)) {
      e.currentTarget.style.backgroundColor = '#fff';
      e.currentTarget.style.color = '#000';
    }
  }}
  style={{
    cursor: 'pointer',
    padding: '5px 14px',
    margin: '5px',
    border: '1px solid #000',
    borderRadius: '12px',
    display: 'inline-block',
    backgroundColor: selectedTags.includes(type) ? '#000' : '#fff',
    color: selectedTags.includes(type) ? '#fff' : '#000',
    transition: 'all 0.2s ease',
  }}
>
  {type}
</span>

            ))
          ) : (
            <p>Đang tải tags...</p>
          )}
        </div>
      </div>
              <a
  href="#"
  className="btn btn-sm font-14 btn-secondary btn-sharp"
  onClick={(e) => {
    e.preventDefault();
    setSelectedTags([]); // xóa toàn bộ tags đã chọn
    setCurrentPage(0);
  }}
>
  Cài lại
</a>

              </aside>
            </div>
          </div>
        </div>
        <div className="col-80 col-xl-9">
          <div className="filter-wrapper">
            <div className="filter-left-area">
  <a
    href="/user/shop/shopJustForYou"
    style={{
      display: 'inline-block',
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'background-color 0.3s ease',
    }}
  >
    <span role="img" aria-label="shopping">🛍️</span> 
    Đi mua sắm cho bạn
  </a>
        
            </div>
            <div className="filter-right-area">
              <a href="javascript:void(0);" className="panel-btn me-2">
                <svg
                  className="me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  width={20}
                  height={20}
                >
                  <g id="Layer_28" data-name="Layer 28">
                    <path d="M2.54,5H15v.5A1.5,1.5,0,0,0,16.5,7h2A1.5,1.5,0,0,0,20,5.5V5h2.33a.5.5,0,0,0,0-1H20V3.5A1.5,1.5,0,0,0,18.5,2h-2A1.5,1.5,0,0,0,15,3.5V4H2.54a.5.5,0,0,0,0,1ZM16,3.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z" />
                    <path d="M22.4,20H18v-.5A1.5,1.5,0,0,0,16.5,18h-2A1.5,1.5,0,0,0,13,19.5V20H2.55a.5.5,0,0,0,0,1H13v.5A1.5,1.5,0,0,0,14.5,23h2A1.5,1.5,0,0,0,18,21.5V21h4.4a.5.5,0,0,0,0-1ZM17,21.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5v-2a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5Z" />
                    <path d="M8.5,15h2A1.5,1.5,0,0,0,12,13.5V13H22.45a.5.5,0,1,0,0-1H12v-.5A1.5,1.5,0,0,0,10.5,10h-2A1.5,1.5,0,0,0,7,11.5V12H2.6a.5.5,0,1,0,0,1H7v.5A1.5,1.5,0,0,0,8.5,15ZM8,11.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z" />
                  </g>
                </svg>
                Filter
              </a>
              <div className="form-group">
                <select className="default-select">
                  <option>Latest</option>
                  <option>Popularity</option>
                  <option>Average rating</option>
                  <option>Latest</option>
                  <option>Low to high</option>
                  <option>high to Low</option>
                </select>
              </div>
              <div className="form-group Category">
                <select className="default-select" value={pageSize} onChange={handlePageChangeProduct}>
                  <option value={20}>Products</option>
                  <option value={32}>32 Products</option>
                  <option value={44}>44 Products</option>
                  <option value={60}>60 Products</option>
                  <option value={72}>72 Products</option>
                  <option value={84}>84 Products</option>
                </select>
              </div>
              <div className="shop-tab">
                <ul className="nav" role="tablist" id="dz-shop-tab">
                  <li className="nav-item" role="presentation">
                    <a
                      href="shop-standard.html#tab-list-list"
                      className="nav-link active"
                      id="tab-list-list-btn"
                      data-bs-toggle="pill"
                      data-bs-target="#tab-list-list"
                      role="tab"
                      aria-controls="tab-list-list"
                      aria-selected="true"
                    >
                      <svg
                        width={512}
                        height={512}
                        viewBox="0 0 512 512"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_121_190)">
                          <path
                            d="M42.667 373.333H96C119.564 373.333 138.667 392.436 138.667 416V469.333C138.667 492.898 119.564 512 96 512H42.667C19.103 512 0 492.898 0 469.333V416C0 392.436 19.103 373.333 42.667 373.333Z"
                            fill="black"
                          />
                          <path
                            d="M42.667 186.667H96C119.564 186.667 138.667 205.77 138.667 229.334V282.667C138.667 306.231 119.564 325.334 96 325.334H42.667C19.103 325.333 0 306.231 0 282.667V229.334C0 205.769 19.103 186.667 42.667 186.667Z"
                            fill="black"
                          />
                          <path
                            d="M42.667 0H96C119.564 0 138.667 19.103 138.667 42.667V96C138.667 119.564 119.564 138.667 96 138.667H42.667C19.103 138.667 0 119.564 0 96V42.667C0 19.103 19.103 0 42.667 0Z"
                            fill="black"
                          />
                          <path
                            d="M230.565 373.333H468.437C492.682 373.333 512.336 392.436 512.336 416V469.333C512.336 492.897 492.682 512 468.437 512H230.565C206.32 512 186.666 492.898 186.666 469.333V416C186.667 392.436 206.32 373.333 230.565 373.333Z"
                            fill="black"
                          />
                          <path
                            d="M230.565 186.667H468.437C492.682 186.667 512.336 205.77 512.336 229.334V282.667C512.336 306.231 492.682 325.334 468.437 325.334H230.565C206.32 325.334 186.666 306.231 186.666 282.667V229.334C186.667 205.769 206.32 186.667 230.565 186.667Z"
                            fill="black"
                          />
                          <path
                            d="M230.565 0H468.437C492.682 0 512.336 19.103 512.336 42.667V96C512.336 119.564 492.682 138.667 468.437 138.667H230.565C206.32 138.667 186.666 119.564 186.666 96V42.667C186.667 19.103 206.32 0 230.565 0Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_121_190">
                            <rect width={512} height={512} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      href="shop-standard.html#tab-list-column"
                      className="nav-link"
                      id="tab-list-column-btn"
                      data-bs-toggle="pill"
                      data-bs-target="#tab-list-column"
                      role="tab"
                      aria-controls="tab-list-column"
                      aria-selected="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: "new 0 0 512 512" }}
                        xmlSpace="preserve"
                        width={512}
                        height={512}
                      >
                        <g>
                          <path d="M85.333,0h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,234.667,0,196.462,0,149.333v-64C0,38.205,38.205,0,85.333,0z" />
                          <path d="M362.667,0h64C473.795,0,512,38.205,512,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,38.205,315.538,0,362.667,0z" />
                          <path d="M85.333,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,512,0,473.795,0,426.667v-64C0,315.538,38.205,277.333,85.333,277.333z" />
                          <path d="M362.667,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64C512,473.795,473.795,512,426.667,512h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,315.538,315.538,277.333,362.667,277.333z" />
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      href="shop-standard.html#tab-list-grid"
                      className="nav-link"
                      id="tab-list-grid-btn"
                      data-bs-toggle="pill"
                      data-bs-target="#tab-list-grid"
                      role="tab"
                      aria-controls="tab-list-grid"
                      aria-selected="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_2"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: "new 0 0 512 512" }}
                        xmlSpace="preserve"
                        width={512}
                        height={512}
                      >
                        <g>
                          <path d="M42.667,373.333H96c23.564,0,42.667,19.103,42.667,42.667v53.333C138.667,492.898,119.564,512,96,512H42.667   C19.103,512,0,492.898,0,469.333V416C0,392.436,19.103,373.333,42.667,373.333z" />
                          <path d="M416,373.333h53.333C492.898,373.333,512,392.436,512,416v53.333C512,492.898,492.898,512,469.333,512H416   c-23.564,0-42.667-19.102-42.667-42.667V416C373.333,392.436,392.436,373.333,416,373.333z" />
                          <path d="M42.667,186.667H96c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.103,42.667-42.667,42.667H42.667   C19.103,325.333,0,306.231,0,282.667v-53.333C0,205.769,19.103,186.667,42.667,186.667z" />
                          <path d="M416,186.667h53.333c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.102,42.667-42.667,42.667H416   c-23.564,0-42.667-19.103-42.667-42.667v-53.333C373.333,205.769,392.436,186.667,416,186.667z" />
                          <path d="M42.667,0H96c23.564,0,42.667,19.103,42.667,42.667V96c0,23.564-19.103,42.667-42.667,42.667H42.667   C19.103,138.667,0,119.564,0,96V42.667C0,19.103,19.103,0,42.667,0z" />
                          <path d="M229.333,373.333h53.333c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.103,42.667-42.667,42.667h-53.333   c-23.564,0-42.667-19.102-42.667-42.667V416C186.667,392.436,205.769,373.333,229.333,373.333z" />
                          <path d="M229.333,186.667h53.333c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.103,42.667-42.667,42.667h-53.333   c-23.564,0-42.667-19.103-42.667-42.667v-53.333C186.667,205.769,205.769,186.667,229.333,186.667z" />
                          <path d="M229.333,0h53.333c23.564,0,42.667,19.103,42.667,42.667V96c0,23.564-19.103,42.667-42.667,42.667h-53.333   c-23.564,0-42.667-19.103-42.667-42.667V42.667C186.667,19.103,205.769,0,229.333,0z" />
                          <path d="M416,0h53.333C492.898,0,512,19.103,512,42.667V96c0,23.564-19.102,42.667-42.667,42.667H416   c-23.564,0-42.667-19.103-42.667-42.667V42.667C373.333,19.103,392.436,0,416,0z" />
                        </g>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 tab-content shop-" id="pills-tabContent">
              <div
                className="tab-pane fade "
                id="tab-list-list"
                role="tabpanel"
                aria-labelledby="tab-list-list-btn"
              >
                <div className="row">
                {product.length > 0 ? (
  product.map((product, index) => (
    <div key={product.asin} className="col-md-12 col-sm-12 col-xxxl-6">
      <div className="dz-shop-card style-2">
        <div className="dz-media">
          <img
            src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${product.productThumbnail}`}
            alt={product.productTitle}
          />
          {product.percentDiscount > 0 && (
            <div className="product-tag">
              <span className="badge badge-secondary">Giảm giá</span>
            </div>
          )}
        </div>
        <div className="dz-content">
          <div className="dz-header">
            <div>
              <h4 className="title mb-0">
                <a href={`/user/productstructure/ProductDetail?asin=${product.asin}`}>
                  {product.productTitle}
                </a>
              </h4>
              <ul className="dz-tags">
                <li>
                  <a href={`/user/shop/shopWithCategory?salesRank=${product.salesRank}`}>
                    {product.salesRank}
                  </a>
                </li>
                <li>
                  <a href={`/user/shop/shopWithCategory?productType=${product.productType}`}>
                    {product.productType}
                  </a>
                </li>
              </ul>
            </div>
            <div className="review-num" style={{ marginTop: '120px' }}>
              <ul className="dz-rating">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className={i < Math.floor(product.rating) ? 'star-fill' : ''}>
                    <i className="flaticon-star-1" />
                  </li>
                ))}
              </ul>
              <span>
                <a href="javascript:void(0);"> {product.reviewCount ?? 0} đánh giá</a>
              </span>
            </div>
          </div>
          <div className="dz-body">
            <div className="dz-rating-box">
              <p className="dz-para">
                {product.productTitle?.substring(0, 120) || 'Không có mô tả có sẵn.'}
              </p>
            </div>
            <div className="rate">
              <div className="d-flex align-items-center mb-xl-3 mb-2">
                <div className="meta-content">
                  <span className="price-name">Giá</span>
                  <span className="price">
                    ${(
                      product.productPrice -
                      product.productPrice * product.percentDiscount / 100
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <button
                  className="btn btn-secondary btn-md btn-icon"
                  onClick={() => addCartWithQuantity(1, product)}
                >
                  <i className="icon feather icon-shopping-cart d-md-none d-block" />
                  <span className="d-md-block d-none">Thêm vào giỏ hàng</span>
                </button>
                <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 2
  }}
>
  {/* Wishlist Icon */}
  <div
    onClick={() => handleToggleWishlist(product.asin)}
    style={{
      width: '40px',
      height: '40px',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }}
  >
    <i
      className={`icon feather ${isProductInWishlist(product.asin) ? 'icon-heart-on' : 'icon-heart'}`}
      style={{ fontSize: '20px', color: isProductInWishlist(product.asin) ? 'red' : '#fff' }}
    />
  </div>

  {/* Cart Icon */}
  <div
    onClick={() => addCartWithQuantity(1, product)}
    style={{
      width: '40px',
      height: '40px',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }}
  >
    <i
      className="icon feather icon-shopping-cart"
      style={{
        fontSize: '20px',
        color: isProductInCart(product.asin) ? 'red' : '#fff'
      }}
    />
  </div>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <p className="px-3">Không có sản phẩm nào để hiển thị.</p>
)}

                </div>
              </div>
              <div
        className="tab-pane fade"
        id="tab-list-column"
        role="tabpanel"
        aria-labelledby="tab-list-column-btn"
      >
        <div className="row gx-xl-4 g-3 mb-xl-0 mb-md-0 mb-3">
          {product.length > 0 ? (
            product.map((product) => (
              <div
                key={product.asin}
                className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30"
              >
                <div className="shop-card style-1">
                  <div className="dz-media" style={{ position: 'relative' }}>
                    <img
                      src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${product.productThumbnail}`}
                      alt={product.productTitle}
                    />

                    {/* Overlay icons */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        zIndex: 2,
                      }}
                    >
                      {/* Quick View */}
                      <div
  onClick={() => {
    // setSelectedProduct(product);
    fetchProductDetail(product.asin);
    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  }}  
  style={{
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }}
>
  <i className="fa-solid fa-eye" style={{ fontSize: '20px', color: '#fff' }} />
</div>
                      {/* Wishlist */}
                      <div
                        onClick={() => handleToggleWishlist(product.asin)}
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'rgba(0, 0, 0, 0.4)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <i
                          className={`icon feather ${
                            isProductInWishlist(product.asin)
                              ? 'icon-heart-on'
                              : 'icon-heart'
                          }`}
                          style={{
                            fontSize: '20px',
                            color: isProductInWishlist(product.asin)
                              ? 'red'
                              : '#fff',
                          }}
                        />
                      </div>

                      {/* Cart */}
                      <div
                        onClick={() => addCartWithQuantity(1, product)}
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'rgba(0, 0, 0, 0.4)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <i
                          className="icon feather icon-shopping-cart"
                          style={{
                            fontSize: '20px',
                            color: isProductInCart(product.asin) ? 'red' : '#fff',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="dz-content">
                    <h5 className="title">
                      <a
                        href={`/user/productstructure/ProductDetail?asin=${product.asin}`}
                      >
                        {product.productTitle}
                      </a>
                    </h5>
                    <h5 className="price">
                      $
                      {(
                        product.productPrice -
                        (product.productPrice * product.percentDiscount) / 100
                      ).toFixed(2)}
                    </h5>
                  </div>

                  <div className="product-tag">
                    <span className="badge">
                      Giảm {product.percentDiscount}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="px-3">Không có sản phẩm nào để hiển thị.</p>
          )}
        </div>
      </div>
      <div
  className="tab-pane fade active show"
  id="tab-list-grid"
  role="tabpanel"
  aria-labelledby="tab-list-grid-btn"
>
  <div className="row gx-xl-4 g-3">
    {product.length > 0 ? (
      product.map((product) => (
        <div
          key={product.asin}
          className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30"
        >
          <div className="shop-card style-1">
            <div className="dz-media">
              <img
                src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${product.productThumbnail}`}
                alt={product.productTitle}
              />
              <div className="shop-meta">
                {/* ✅ Quick View mở modal thủ công, tránh lỗi backdrop */}
                <div
                  className="btn btn-secondary btn-md btn-rounded"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                  //  setSelectedProduct(product);
                  fetchProductDetail(product.asin);
                   handleSearchAsin(product.asin);
                    setTimeout(() => {
                      const modal = new window.bootstrap.Modal(
                        document.getElementById('exampleModal')
                      );
                      modal.show();
                    }, 100);
                  }}
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none" >Xem nhanh</span>
                </div>

                {/* Wishlist + Cart icons */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    zIndex: 2,
                  }}
                >
                  {/* Wishlist */}
                  <div
                    onClick={() => handleToggleWishlist(product.asin)}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <i
                      className={`icon feather ${
                        isProductInWishlist(product.asin)
                          ? 'icon-heart-on'
                          : 'icon-heart'
                      }`}
                      style={{
                        fontSize: '20px',
                        color: isProductInWishlist(product.asin)
                          ? 'red'
                          : '#fff',
                      }}
                    />
                  </div>

                  {/* Cart */}
                  <div
                    onClick={() => addCartWithQuantity(1, product)}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <i
                      className="icon feather icon-shopping-cart"
                      style={{
                        fontSize: '20px',
                        color: isProductInCart(product.asin)
                          ? 'red'
                          : '#fff',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="dz-content">
              <h5 className="title">
                <a
                  href={`/user/productstructure/ProductDetail?asin=${product.asin}`}
                >
                  {product.productTitle}
                </a>
              </h5>
              <h5 className="price">
                $
                {(
                  product.productPrice -
                  (product.productPrice * product.percentDiscount) / 100
                ).toFixed(2)}
              </h5>
            </div>

            <div className="product-tag">
              <span className="badge">
                Giảm  {product.percentDiscount}%
              </span>
            </div>
          </div>
        </div>
      ))
    ) : (
      'khong co gi het'
    )}
  </div>
</div>

            </div>
          </div>
          <div className="row page mt-0">
            <div className="col-md-6">
              <p className="page-text">Showing 1–5 Of 50 Results</p>
            </div>
          <div className="col-md-6">
        <nav aria-label="Product Pagination">
          <ul className="pagination style-1">
            {/* Nút Previous */}
            <li className="page-item">
              <a
                className={`page-link ${currentPage === 0 ? 'disabled' : ''}`}
               
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Trước
              </a>
            </li>
            {/* Các số trang trong phạm vi */}
            {getPageRange().map((page) => (
              <li className="page-item" key={page}>
                <a
                  className={`page-link ${page === currentPage ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page + 1}
                </a>
              </li>
            ))}
            {/* Nút Next */}
            <li className="page-item">
              <a
                className={`page-link next ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Sau
              </a>
            </li>
          </ul>
        </nav>
      </div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal quick-view-modal fade"
  id="exampleModal"
  tabIndex={-1}
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        <i className="icon feather icon-x" />
      </button>
      <div className="modal-body">
        <div className="row g-xl-4 g-3">
          <div className="col-xl-6 col-md-6">
            <div className="dz-product-detail mb-0">
              <div className="swiper-btn-center-lr">
                <div className="swiper quick-modal-swiper2">
                  <div className="swiper-wrapper" id="lightgallery">
                    
                    {selectedProduct !== null && (
                      
     <div className="swiper-slide">
                      <div className="dz-media DZoomImage">
                        <a
                          className="mfp-link lg-item"
                          href={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${selectedProduct.productThumbnail}`}
                          data-src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${selectedProduct.productThumbnail}`}
                        >
                          <i className="feather icon-maximize dz-maximize top-right" />
                        </a>
                        <img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${selectedProduct.productThumbnail}`} alt="image" />
                      </div>
                    </div>
)}
                  </div>
                </div>
                <div className="swiper quick-modal-swiper thumb-swiper-lg thumb-sm swiper-vertical">
                  <div className="swiper-wrapper">
                         {selectedProduct !== null && (
 <div className="swiper-slide">
                      <img
                        src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_60,h_60/imgProduct/IMG/${selectedProduct.productThumbnail}`}
                        alt="image"
                      />
                    </div>
                         )}                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-6">
            <div className="dz-product-detail style-2 ps-xl-3 ps-0 pt-2 mb-0">
              
              <div className="dz-content">
                <div className="dz-content-footer">
                  <div className="dz-content-start">
                                                {selectedProduct !== null && (

                    <span className="badge bg-secondary mb-2">
                      Giảm {selectedProduct.percentDiscount}% 
                    </span>
                       )}
                    <h4 className="title mb-1">
                            {selectedProduct !== null && (
                      <a href=  {`/user/productstructure/ProductDetail?asin=${selectedProduct.asin}`}>{selectedProduct.productTitle}</a>
                            )}
                    </h4>
                    <div className="review-num">
                      <ul className="dz-rating me-2">
                        <li className="star-fill">
                          <i className="flaticon-star-1" />
                        </li>
                        <li className="star-fill">
                          <i className="flaticon-star-1" />
                        </li>
                        <li className="star-fill">
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                      </ul>
                      <span className="text-secondary me-2">4.7 sao</span>
                      <a href="javascript:void(0);">(5 khách hàng đánh giá)</a>
                    </div>
                  </div>
                </div>
                <p className="para-text">
                    {selectedProduct !== null && (
                      selectedProduct.productTitle
         )}
                </p>
                <div className="meta-content m-b20 d-flex align-items-end">
                <div className="me-3">
  <span className="form-label">Giá</span>
  {selectedProduct ? (
    <span className="price">
      ${priceDiscount} <del>${selectedProduct.productPrice}</del>
    </span>
  ) : (
    <span className="price">N/A</span>
  )}
</div>
       <div className="btn-quantity light me-0">
    <label className="form-label fw-bold">Số lượng</label>
    <div className="input-group">
  <button
    className="btn btn-dark rounded-circle p-0"
    style={{
      width: '40px',
      height: '40px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      minWidth: 'unset',
      flex: '0 0 auto',
    }}
    onClick={() => {
      if (quantity > 1) {
        setQuantity(q => q - 1);
      } else {
        triggerToast("⚠️ Số lượng tối thiểu là 1", "error");
      }
    }}
  >
    -
  </button>

  <input
    type="text"
    min="1"
    value={quantity}
    onChange={handleChange}
    className="form-control text-center"
  />

  <button
    className="btn btn-dark rounded-circle p-0"
    style={{
      width: '40px',
      height: '40px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      minWidth: 'unset',
      flex: '0 0 auto',
    }}
    onClick={() => {
      if (availableStock !== null && quantity >= availableStock) {
        triggerToast(`❌ Chỉ còn ${availableStock} sản phẩm có sẵn`, "error");
      } else {
        setQuantity(q => q + 1);
      }
    }}
  >
    +
  </button>
</div>
  </div>
                </div>
{/* --- CHỌN MÀU --- */}
{selectedProduct?.colorAsin && (() => {
  let colors = [];
  try {
    colors = JSON.parse(selectedProduct.colorAsin);
  } catch (error) {
    console.error("❌ Lỗi parse colorAsin:", error);
  }
  return colors.length > 0 ? (
    <div className="mb-3">
      <label className="form-label fw-bold">Màu sắc</label>
      <div className="d-flex align-items-center flex-wrap gap-2">
        {colors.map((color, index) => {
          const parsedColor = {
            ...color,
            colorId: parseInt(color.color_id), // chuyển string => number
          };
          const inputId = `colorRadioModal-${index}`;
          return (
            <div className="form-check" key={index}>
              <input
                type="radio"
                className="btn-check"
                name="colorRadioModal"
                id={inputId}
                checked={selectedColor?.colorId === parsedColor.colorId}
                onChange={() => setSelectedColor(parsedColor)}
              />
              <label
                className="btn"
                htmlFor={inputId}
                style={{
                  backgroundColor: color.code_color,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: selectedColor?.colorId === parsedColor.colorId ? '2px solid black' : '1px solid #ccc',
                  cursor: 'pointer',
                  boxShadow: selectedColor?.colorId === parsedColor.colorId ? '0 0 3px rgba(0,0,0,0.5)' : 'none',
                  padding: 0,
                }}
                title={color.name_color}
              />
            </div>
          );
        })}
      </div>
      <p className="form-label mt-1">Selected: {selectedColor?.name_color || 'None'}</p>
    </div>
  ) : null;
})()}

<>
  <style>
    {`
      .product-size .btn {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        padding: 0;
        text-align: center;
        line-height: 40px;
        border: 1px solid black;
        font-weight: bold;
        background-color: white;
        color: black;
        transition: all 0.2s ease;
      }

      .product-size .btn-check:checked + .btn {
        background-color: black;
        color: white;
        border-color: black;
      }

      .product-size .btn:hover {
        background-color: #f0f0f0;
      }
    `}
  </style>

  <div className="d-block mb-3">
    <label className="form-label fw-bold">Kích thước</label>
    <div className="btn-group flex-wrap product-size m-0" role="group">
      {selectedProduct?.sizes?.length > 0 ? (
        selectedProduct.sizes.map((size, index) => {
          const inputId = `btnradiol${index}`;
          return (
            <React.Fragment key={index}>
              <input
                type="radio"
                className="btn-check"
                name="btnradio2"
                id={inputId}
                checked={selectedSize?.sizeId === size.sizeId}
                onChange={() => setSelectedSize(size)}
              />
              <label className="btn m-1" htmlFor={inputId}>
                {size.sizeName}
              </label>
            </React.Fragment>
          );
        })
      ) : (
        <p>Không có kích thước nào</p>
      )}
    </div>
  </div>
</>


{/* --- HIỂN THỊ SỐ LƯỢNG CÒN LẠI --- */}
<div className="mb-3">
  <label className="form-label fw-bold d-flex align-items-center">
    Quantity:
    {availableStock !== null && (
      <span className="ms-2">({availableStock} sản phẩm)</span>
    )}
  </label>
</div>
                <div className=" cart-btn">
                  <button  onClick={addCart}
                    className="btn btn-secondary text-uppercase"
                  >
                    Add To Cart
                  </button>
                  <button
  className="btn btn-md btn-outline-secondary btn-icon"
  onClick={() => handleToggleWishlist(selectedProduct.asin)}
>
                    <svg
                      width={19}
                      height={17}
                      viewBox="0 0 19 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.24805 16.9986C8.99179 16.9986 8.74474 16.9058 8.5522 16.7371C7.82504 16.1013 7.12398 15.5038 6.50545 14.9767L6.50229 14.974C4.68886 13.4286 3.12289 12.094 2.03333 10.7794C0.815353 9.30968 0.248047 7.9162 0.248047 6.39391C0.248047 4.91487 0.755203 3.55037 1.67599 2.55157C2.60777 1.54097 3.88631 0.984375 5.27649 0.984375C6.31552 0.984375 7.26707 1.31287 8.10464 1.96065C8.52734 2.28763 8.91049 2.68781 9.24805 3.15459C9.58574 2.68781 9.96875 2.28763 10.3916 1.96065C11.2292 1.31287 12.1807 0.984375 13.2197 0.984375C14.6098 0.984375 15.8885 1.54097 16.8202 2.55157C17.741 3.55037 18.248 4.91487 18.248 6.39391C18.248 7.9162 17.6809 9.30968 16.4629 10.7792C15.3733 12.094 13.8075 13.4285 11.9944 14.9737C11.3747 15.5016 10.6726 16.1001 9.94376 16.7374C9.75136 16.9058 9.50417 16.9986 9.24805 16.9986ZM5.27649 2.03879C4.18431 2.03879 3.18098 2.47467 2.45108 3.26624C1.71033 4.06975 1.30232 5.18047 1.30232 6.39391C1.30232 7.67422 1.77817 8.81927 2.84508 10.1066C3.87628 11.3509 5.41011 12.658 7.18605 14.1715L7.18935 14.1743C7.81021 14.7034 8.51402 15.3033 9.24654 15.9438C9.98344 15.302 10.6884 14.7012 11.3105 14.1713C13.0863 12.6578 14.6199 11.3509 15.6512 10.1066C16.7179 8.81927 17.1938 7.67422 17.1938 6.39391C17.1938 5.18047 16.7858 4.06975 16.045 3.26624C15.3152 2.47467 14.3118 2.03879 13.2197 2.03879C12.4197 2.03879 11.6851 2.29312 11.0365 2.79465C10.4585 3.24179 10.0558 3.80704 9.81975 4.20255C9.69835 4.40593 9.48466 4.52733 9.24805 4.52733C9.01143 4.52733 8.79774 4.40593 8.67635 4.20255C8.44041 3.80704 8.03777 3.24179 7.45961 2.79465C6.811 2.29312 6.07643 2.03879 5.27649 2.03879Z"
                        fill="black"
                      />
                    </svg>
                    Thêm vào yêu thích
                  </button>
                </div>
                <div className="dz-info mb-0">
                                {selectedProduct !== null && (

                  <ul><li><strong>SKU:</strong></li><li>{selectedProduct.asin}</li></ul>
                      )}
                  <ul>
                    <li>
                      <strong>Danh mục:</strong>
                    </li>
        {selectedProduct !== null && (
  <>
    <li>
      <a href={`/user/shop/shopWithCategory?salesRank=${selectedProduct.salesRank}`}>
        {selectedProduct.salesRank}
        {selectedProduct.productType && ','}
      </a>
    </li>

    {selectedProduct.productType && (
      <li>
        <a href={`/user/shop/shopWithCategory?productType=${selectedProduct.productType}`}>{selectedProduct.productType}</a>
      </li>
    )}
  </>
)}
                  </ul>
                  <ul>
                    <li>
                      <strong>Tags:</strong>
                    </li>
              {Object.entries(tags).map(([tag, count], index, arr) => (
  <li key={tag}>
    <a href="shop-standard.html">
      {tag}{index < arr.length - 1 ? ', ' : ''}
    </a>
  </li>
))}
                  </ul>
                  <div className="dz-social-icon">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.facebook.com/dexignzone"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://twitter.com/dexignzones"
                        >
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.youtube.com/@dexignzone1723"
                        >
                          <i className="fa-brands fa-youtube" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.linkedin.com/showcase/3686700/admin/"
                        >
                          <i className="fa-brands fa-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          className="text-dark"
                          href="https://www.instagram.com/dexignzone/"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </section>
</div>

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
         {showToast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            padding: "12px 20px",
            backgroundColor: toastType === "success" ? "#4caf50" : "#f44336",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {toastMessage}
        </div>
      )}
      </div>
    </>
  );
}

export default ShopStandard;