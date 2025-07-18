import React, { useEffect, useState, useCallback, useMemo} from 'react';
import WOW from 'wowjs';
// import QuickViewModal from '../../components/home/QuickViewModal';
import ScrollTopButton from '../../layout/ScrollTopButton';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ShopWithCategory() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const maxPagesToShow = 10;

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [listCart, setListCart] = useState([]);

  const [categoryProductType, setCategoryProductType] = useState([]);
  const [productTypeCategories, setProductTypeCategories] = useState([]);
  const [salesRankCount, setSalesRankCount] = useState({}); 

  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(400);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const salesRank = searchParams.get('salesRank');
  const productType = searchParams.get('productType');
  const tagsFromURL = searchParams.get('tags');
  const [salesRankCategories, setSalesRankCategories] = useState([]);
  const [tags, setTags] = useState({});
  const [productTypeCount, setProductTypeCount] = useState({});

  useEffect(() => {
    const modal = document.getElementById("exampleModal");
    if (modal) {
      modal.addEventListener("hidden.bs.modal", () => {
        setSelectedProduct(null);
        setQuantity(1); // reset lại số lượng nếu cần
      });
    }
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSetKeyword = useCallback(
    debounce((value) => {
      setKeyword(value);
      setCurrentPage(0);
    }, 500),
    []
  );

  const handleInputChangeSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetKeyword(value);
  };
  const fetchProductsByCategories = async (page, size) => {
    const params = { page, size };
  
    if (salesRank) params.salesRank = salesRank;
    if (productType) params.productType = productType;
    if (tagsFromURL) params.tags = tagsFromURL;  // ✅ Sửa tại đây
  
    try {
      const response = await axios.get('http://localhost:8083/api/products/filterCategories', { params });
  
      const productsPage = response.data.products;
      setProducts(productsPage.content);
      setTotalPages(productsPage.totalPages);
  
      setSalesRankCategories(response.data.salesRankCategories || []);
      setProductTypeCategories(response.data.productTypeCategories || []);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  const displayedCategories = useMemo(() => {
    if (productTypeCategories.length > 0) return productTypeCategories;
    if (salesRankCategories.length > 0) return salesRankCategories;
    return [];
  }, [productTypeCategories, salesRankCategories]);
  
  const fetchProductsData = useCallback(
    async (
      page,
      size,
      searchTerm = '',
      minPrice = null,
      maxPrice = null,
      tags = [],
      salesRank = null,
      productType = null
    ) => {
      setLoading(true);
      try {
        const params = { page, size };

        if (searchTerm.trim() !== '') params.keyword = searchTerm;
        if (!isNaN(minPrice)) params.minPrice = minPrice;
        if (!isNaN(maxPrice)) params.maxPrice = maxPrice;
        if (tags.length > 0) params.tags = tags.join(',');
        if (salesRank) params.salesRank = salesRank;
        if (productType) params.productType = productType;

        const res = await axios.get('http://localhost:8085/api/search/searchAdvance', { params });

        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('❌ Lỗi fetchProductsData:', error);
        setProducts([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const getAllCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8083/api/products/getAllCategories');
  
      setSalesRankCount(res.data.salesRankCount || {});
      setProductTypeCount(res.data.productTypeCount || {});
      setTags(res.data.tags || {});
  
      // ✅ set danh sách có thumbnail
      setSalesRankCategories(res.data.salesRankCategories || []);
    } catch (error) {
      console.error('❌ Lỗi lấy danh mục:', error);
    }
  };
  
  
  const getCartProduct = async () => {
    const cartId = localStorage.getItem('cartId') || '';
    const token = localStorage.getItem('accessToken') || '';
    try {
      const res = await axios.get('http://localhost:8084/api/cart/getCart', {
        params: { cartId, token },
      });
      setListCart(res.data.items || []);
    } catch (error) {
      console.error('❌ Lỗi lấy giỏ hàng:', error);
      setListCart([]);
    }
  };

  const addCart = async () => {
    const cartId = localStorage.getItem("cartId") || "";
    const token = localStorage.getItem("accessToken") || "";
  
    if (!selectedProduct || !selectedSize || !selectedColor) {
      alert("Vui lòng chọn đầy đủ size và màu sắc trước khi thêm vào giỏ hàng.");
      return;
    }
  
    try {
      const payload = {
        token,
        asin: selectedProduct.asin,
        quantity,
        price: parseFloat(priceDiscount),
        cartId,
        size: selectedSize,
        nameColor: selectedColor.name_color,
        colorAsin: JSON.stringify(selectedProduct.colors || []),
      };
  
      const response = await axios.post("http://localhost:8084/api/cart/addCart", payload);
      if (response.data.cartId) {
        localStorage.setItem("cartId", response.data.cartId);
      }
  
      window.dispatchEvent(new Event("cartUpdated"));
      window.location.href = "/user/shoppages/cart";
    } catch (error) {
      console.error("❌ Không thể thêm vào giỏ hàng:", error.response?.data || error.message);
    }
  };
  

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
      const res = await axios.post('http://localhost:8084/api/cart/addCart', payload);
      if (res.data.cartId) localStorage.setItem('cartId', res.data.cartId);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('❌ Lỗi thêm giỏ hàng:', error);
    }
  };

  const isProductInCart = (asin) => {
    return listCart.some((item) => item.asin === asin);
  };

  const fetchWishlist = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:8083/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(res.data);
    } catch (error) {
      console.error('❌ Lỗi wishlist:', error);
    }
  };

  const handleToggleWishlist = async (asin) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
  
    const isInWishlist = wishlistItems.some((item) => item.asin === asin);
    try {
      if (isInWishlist) {
        await axios.delete(`http://localhost:8083/api/wishlist/${asin}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:8083/api/wishlist/${asin}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        window.location.href = "/user/wishlist";
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
   

  const isProductInWishlist = (asin) => {
    return wishlistItems.some((item) => item.asin === asin);
  };

  useEffect(() => {
    if (selectedProduct) {
      const discountPrice = (
        selectedProduct.productPrice * quantity -
        (selectedProduct.productPrice * selectedProduct.percentDiscount * quantity) / 100
      ).toFixed(2);
      setPriceDiscount(discountPrice);
    } else {
      setPriceDiscount(0);
    }
  }, [selectedProduct, quantity]);

  useEffect(() => {
    getAllCategories();
    fetchWishlist();
    getCartProduct();

    const handleCartUpdate = () => getCartProduct();
    const handleWishlistUpdate = () => fetchWishlist();

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);
  useEffect(() => {
    getAllCategories(); // ✅ Luôn gọi để hiển thị danh mục
  
    const hasCategoryParam = salesRank || productType || tagsFromURL;
  
    if (hasCategoryParam) {
      fetchProductsByCategories(currentPage, pageSize);
    } else {
      fetchProductsData(
        currentPage,
        pageSize,
        keyword,
        minValue,
        maxValue,
        selectedTags
      );
    }
  }, [
    currentPage,
    pageSize,
    keyword,
    minValue,
    maxValue,
    selectedTags,
    salesRank,
    productType,
    tagsFromURL,
    fetchProductsData
  ]);
  
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  useEffect(() => {
    const sliderInit = setInterval(() => {
      const slider = document.getElementById('slider-tooltips2');
      if (slider && slider.noUiSlider) {
        slider.noUiSlider.on('change', (values) => {
          const [min, max] = values.map(Number);
          setMinValue(min);
          setMaxValue(max);
        });
        clearInterval(sliderInit);
      }
    }, 100);
    return () => clearInterval(sliderInit);
  }, []);

  useEffect(() => {
    const modalElement = document.getElementById('exampleModal');
    const resetModal = () => {
      setQuantity(1);
      setPriceDiscount(0);
    };
    if (modalElement) modalElement.addEventListener('hidden.bs.modal', resetModal);
    return () => modalElement?.removeEventListener('hidden.bs.modal', resetModal);
  }, []);
  const handleTagToggle = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
    setCurrentPage(0);
  };
  

  const scrollToFilterWrapper = () => {
    const filterWrapper = document.querySelector('.filter-wrapper');
    if (filterWrapper) {
      filterWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const handleChange = (e) => {
    const value = e.target.value;
    const parsed = parseInt(value);
    setQuantity(isNaN(parsed) || parsed < 1 ? 1 : parsed);
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
        <h1>Shop With Category</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Shop With Category</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {/*Banner End*/}
  <section className="content-inner-3 pt-3 z-index-unset">
    <div className="container-fluid">
      <div className="row mt-xl-2 mt-0">
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
            <div className="shop-filter">
            <aside>
  <div className="d-flex align-items-center justify-content-between m-b30">
    <h6 className="title mb-0 fw-normal d-flex">
      <i className="flaticon-filter me-3" />
      Filter
    </h6>
  </div>

  {/* Search */}
  <div className="widget widget_search">
    <div className="form-group">
      <div className="input-group">
        <input
          name="dzSearch"
          value={inputValue}
          onChange={handleInputChangeSearch}
          required
          type="search"
          className="form-control"
          placeholder="Search Product"
        />
        <div className="input-group-addon">
          <button name="submit" type="submit" className="btn">
            <i className="icon feather icon-search" />
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Price */}
  <div className="widget">
    <h6 className="widget-title">Price</h6>
    <div className="price-slide range-slider">
      <div className="range-slider style-1">
        <div id="slider-tooltips2" className="mb-3" />
        <span id="slider-margin-value-min2" />
        <span id="slider-margin-value-max2" />
      </div>
    </div>
  </div>

  {/* Sales Rank Category */}
  <div className="widget widget_categories">
    <h6 className="widget-title">Category</h6>
    <ul>
      {Object.entries(salesRankCount).map(([type, count]) => (
        <li className="cat-item cat-item-26" key={type}>
          <a href={`/user/shop/shopWithCategory?salesRank=${type}`}>{type}</a> ({count})
        </li>
      ))}
    </ul>
  </div>

  {/* Product Type */}
  <div className="widget widget_categories">
  <h6 className="widget-title">Type</h6>
  <ul>
    {Object.entries(productTypeCount).map(([type, count]) => (
      <li className="cat-item cat-item-26" key={type}>
        <a href={`/user/shop/shopWithCategory?productType=${type}`}>{type}</a> ({count})
      </li>
    ))}
  </ul>
</div>

  {/* Tags */}
  <div className="widget widget_tag_cloud">
    <h6 className="widget-title">Tags</h6>
    <div className="tagcloud">
      {Object.entries(tags || {}).length > 0 ? (
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

  {/* Reset */}
  <a
    href="#"
    className="btn btn-sm font-14 btn-secondary btn-sharp"
    onClick={(e) => {
      e.preventDefault();
      setSelectedTags([]);
      setCurrentPage(0);
    }}
  >
    RESET
  </a>
</aside>

            </div>
          </div>
        </div>
        <div className="col-80 col-xl-9">
          <h4 className="mb-3">Category</h4>
          <div className="row">
  <div className="col-xl-12">
    <div className="swiper category-swiper">
      <div className="swiper-wrapper">
        {salesRankCategories.length > 0 ? (
          salesRankCategories.map((item) => (
            <div className="swiper-slide" key={item.category}>
              <a
                href={`/user/shop/shopWithCategory?salesRank=${encodeURIComponent(item.category)}`}
                className="text-center d-block"
              >
                <div className="p-2">
                  <img
                    src={
                      item.thumbnail
                        ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_100,h_100,c_fill/imgProduct/IMG/${item.thumbnail}`
                        : `https://via.placeholder.com/100x100?text=${encodeURIComponent(item.category)}`
                    }
                    alt={item.category}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                    className="img-fluid rounded-circle mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div className="small fw-medium text-dark">{item.category}</div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <p className="px-3">Không có danh mục nào để hiển thị.</p>
        )}
      </div>
    </div>
  </div>
</div>


          <div className="filter-wrapper border-top p-t20">
            <div className="filter-left-area">
              <ul className="filter-tag">
                <li>
                  <a href="javascript:void(0);" className="tag-btn">
                    Dresses
                    <i className="icon feather icon-x tag-close" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="tag-btn">
                    Tops
                    <i className="icon feather icon-x tag-close" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="tag-btn">
                    Outerwear
                    <i className="icon feather icon-x tag-close" />
                  </a>
                </li>
              </ul>
              <span>Showing 1–5 Of 50 Results</span>
            </div>
            <div className="filter-right-area">
              <a href="javascript:void(0);" className="panel-btn">
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
                      href="shop-with-category.html#tab-list-list"
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
                      href="shop-with-category.html#tab-list-column"
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
                      href="shop-with-category.html#tab-list-grid"
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
  className="tab-pane fade"
  id="tab-list-list"
  role="tabpanel"
  aria-labelledby="tab-list-list-btn"
>
  <div className="row">
    {products.length > 0 ? (
      products.map((product) => (
        <div
          className="col-md-12 col-sm-12 col-xxxl-6"
          key={product.asin}
        >
          <div className="dz-shop-card style-2">
            <div className="dz-media" style={{ position: "relative" }}>
              <img
                src={
                  product.images?.[0]?.imageData
                    ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${product.images[0].imageData}`
                    : `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${product.productThumbnail}`
                }
                alt={product.productTitle}
              />
              {product.percentDiscount > 0 && (
                <div className="product-tag">
                  <span className="badge badge-secondary">
                    GET {product.percentDiscount}% OFF
                  </span>
                </div>
              )}

              {/* Overlay buttons */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  zIndex: 2,
                }}
              >
                {/* Quick View */}
                <div
                  onClick={() => {
                    setSelectedProduct(product);
                    const modal = new window.bootstrap.Modal(
                      document.getElementById("exampleModal")
                    );
                    modal.show();
                  }}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fa-solid fa-eye"
                    style={{ fontSize: "20px", color: "#fff" }}
                  />
                </div>

                {/* Wishlist */}
                <div
                  onClick={() => handleToggleWishlist(product.asin)}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: isProductInWishlist(product.asin)
                      ? "rgba(255, 0, 0, 0.15)"
                      : "rgba(0, 0, 0, 0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className={`icon feather ${
                      isProductInWishlist(product.asin)
                        ? "icon-heart-on"
                        : "icon-heart"
                    }`}
                    style={{
                      fontSize: "20px",
                      color: isProductInWishlist(product.asin) ? "red" : "#fff",
                    }}
                  />
                </div>

                {/* Cart */}
                <div
                  onClick={() => addCartWithQuantity(1, product)}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="icon feather icon-shopping-cart"
                    style={{
                      fontSize: "20px",
                      color: isProductInCart(product.asin) ? "red" : "#fff",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="dz-content">
              <div className="dz-header">
                <div>
                  <h4 className="title mb-0">
                    <a
                      href={`/user/productstructure/ProductDetail?asin=${product.asin}`}
                    >
                      {product.productTitle}
                    </a>
                  </h4>
                  <ul className="dz-tags">
                    {product.salesRank && (
                      <li>
                        <a
                          href={`/user/shop/shopWithCategory?salesRank=${product.salesRank}`}
                        >
                          {product.salesRank}
                          {product.productType && ","}
                        </a>
                      </li>
                    )}
                    {product.productType && (
                      <li>
                        <a
                          href={`/user/shop/shopWithCategory?productType=${product.productType}`}
                        >
                          {product.productType}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="review-num">
                  <ul className="dz-rating">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className={i <= 4 ? "star-fill" : ""}>
                        <i className="flaticon-star-1" />
                      </li>
                    ))}
                  </ul>
                  <span>
                    <a href="javascript:void(0);">
                      {product.numberOfRatings || 0} Review
                    </a>
                  </span>
                </div>
              </div>

              <div className="dz-body">
                <div className="dz-rating-box">
                  <p className="dz-para">
                    {product.description || "No description available."}
                  </p>
                </div>
                <div className="rate">
                  <div className="d-flex align-items-center mb-xl-3 mb-2">
                    <div className="meta-content">
                      <span className="price-name">Price</span>
                      <span className="price">
                        $
                        {(
                          product.productPrice -
                          (product.productPrice *
                            (product.percentDiscount || 0)) /
                            100
                        ).toFixed(2)}
                        {product.percentDiscount > 0 && (
                          <del className="ms-2">
                            ${product.productPrice.toFixed(2)}
                          </del>
                        )}
                      </span>
                    </div>
                  </div>
                  {/* Responsive add to cart button */}
                  <div className="d-flex d-md-none">
                    <button
                      className="btn btn-secondary btn-md btn-icon"
                      onClick={() => addCartWithQuantity(1, product)}
                    >
                      <i className="icon feather icon-shopping-cart" />
                      <span className="ms-2">Add to cart</span>
                    </button>
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
    {products.length > 0 ? (
      products.map((product) => (
        <div
          key={product.asin}
          className="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30"
        >
          <div className="shop-card style-1">
            <div className="dz-media">
              <img
                src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${product.productThumbnail}`}
                alt={product.productTitle}
              />
              <div className="shop-meta">
                {/* Quick View */}
                <div
                  className="btn btn-secondary btn-md btn-rounded"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedProduct(product);
                    const modal = new window.bootstrap.Modal(
                      document.getElementById("exampleModal")
                    );
                    modal.show();
                  }}
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </div>

                {/* Wishlist */}
                <div
                  onClick={() => handleToggleWishlist(product.asin)}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: isProductInWishlist(product.asin)
                      ? "rgba(255, 0, 0, 0.15)"
                      : "rgba(0, 0, 0, 0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className={`icon feather ${
                      isProductInWishlist(product.asin)
                        ? "icon-heart-on"
                        : "icon-heart"
                    }`}
                    style={{
                      fontSize: "20px",
                      color: isProductInWishlist(product.asin) ? "red" : "#fff",
                    }}
                  />
                </div>

                {/* Cart */}
                <div
                  onClick={() => addCartWithQuantity(1, product)}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="flaticon flaticon-basket"
                    style={{
                      fontSize: "20px",
                      color: isProductInCart(product.asin) ? "red" : "#fff",
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
                Get {product.percentDiscount}% Off
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
    {products.length > 0 ? (
      products.map((product) => (
        <div
          key={product.asin}
          className="col-6 col-xl-3 col-lg-5 col-md-4 col-sm-6 m-md-b15 m-b30"
        >
          <div className="shop-card style-1">
            <div className="dz-media">
              <img
                src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_350,h_300/imgProduct/IMG/${product.productThumbnail}`}
                alt={product.productTitle}
              />
              <div className="shop-meta">
                {/* Quick View */}
                <div
                  className="btn btn-secondary btn-md btn-rounded"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedProduct(product);
                    setTimeout(() => {
                      const modal = new window.bootstrap.Modal(
                        document.getElementById("exampleModal")
                      );
                      modal.show();
                    }, 100);
                  }}
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </div>

                {/* Wishlist */}
                <div
                  onClick={() => handleToggleWishlist(product.asin)}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: isProductInWishlist(product.asin)
                      ? "rgba(255, 0, 0, 0.15)"
                      : "rgba(0, 0, 0, 0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className={`icon feather ${
                      isProductInWishlist(product.asin)
                        ? "icon-heart-on"
                        : "icon-heart"
                    }`}
                    style={{
                      fontSize: "20px",
                      color: isProductInWishlist(product.asin) ? "red" : "#fff",
                    }}
                  />
                </div>

                {/* Cart */}
                <div
                  onClick={() => addCartWithQuantity(1, product)}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="flaticon flaticon-basket"
                    style={{
                      fontSize: "20px",
                      color: isProductInCart(product.asin) ? "red" : "#fff",
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
                Get {product.percentDiscount}% Off
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
                Previous
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
                Next
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
                        SALE {selectedProduct.percentDiscount}% Off
                      </span>
                    )}
                    <h4 className="title mb-1">
                      {selectedProduct !== null && (
                        <a href={`/user/productstructure/ProductDetail?asin=${selectedProduct.asin}`}>{selectedProduct.productTitle}</a>
                      )}
                    </h4>
                    <div className="review-num">
                      <ul className="dz-rating me-2">
                        {[...Array(5)].map((_, i) => (
                          <li className={i < 3 ? "star-fill" : ""} key={i}>
                            <i className="flaticon-star-1" />
                          </li>
                        ))}
                      </ul>
                      <span className="text-secondary me-2">4.7 Rating</span>
                      <a href="javascript:void(0);">(5 customer reviews)</a>
                    </div>
                  </div>
                </div>
                <p className="para-text">
                  {selectedProduct !== null && selectedProduct.productTitle}
                </p>
                <div className="meta-content m-b20 d-flex align-items-end">
                  <div className="me-3">
                    <span className="form-label">Price</span>
                    {selectedProduct !== null && (
                      <span className="price">${priceDiscount} <del>${(selectedProduct.productPrice * quantity).toFixed(2)}</del></span>
                    )}
                  </div>
                  <div className="btn-quantity light me-0">
                    <label className="form-label fw-bold">Quantity</label>
                    <div className="input-group">
                      <button className="btn btn-dark rounded-circle p-0" style={{ width: '40px', height: '40px' }} onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                      <input type="text" min="1" value={quantity} onChange={handleChange} className="form-control text-center" />
                      <button className="btn btn-dark rounded-circle p-0" style={{ width: '40px', height: '40px' }} onClick={() => setQuantity(q => q + 1)}>+</button>
                    </div>
                  </div>
                </div>
                {/* Color */}
                {selectedProduct?.colorAsin && (() => {
  let colors = [];
  try {
    colors = JSON.parse(selectedProduct.colorAsin);
  } catch (e) {
    console.error(e);
  }

  return colors.length > 0 && (
    <div className="mb-3">
      <label className="form-label fw-bold">Color</label>
      <div className="d-flex flex-wrap gap-2 align-items-center">
        {colors.map((color, index) => {
          const inputId = `colorRadio-${index}`;
          const isSelected = selectedColor?.name_color === color.name_color;
          return (
            <div key={index} className="form-check m-0 p-0">
              <input
                type="radio"
                className="visually-hidden"
                name="colorRadio"
                id={inputId}
                checked={isSelected}
                onChange={() => setSelectedColor(color)}
              />
              <label
                htmlFor={inputId}
                style={{
                  backgroundColor: color.code_color,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: isSelected ? '2px solid black' : '1px solid #ccc',
                  display: 'inline-block',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 3px rgba(0,0,0,0.5)' : 'none',
                  transition: '0.2s ease',
                }}
                title={color.name_color}
              />
            </div>
          );
        })}
      </div>
      <p className="form-label mt-1">Selected: {selectedColor?.name_color || 'None'}</p>
    </div>
  );
})()}

                {/* Size */}
                {selectedProduct?.sizes?.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label fw-bold">Size</label>
                    <div className="btn-group flex-wrap" role="group">
                      {selectedProduct.sizes.map((size, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`btn btn-outline-dark m-1 ${selectedSize === size.sizeName ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size.sizeName)}
                          style={{ minWidth: '60px' }}
                        >
                          {size.sizeName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="cart-btn">
                  <button onClick={addCart} className="btn btn-secondary text-uppercase">Add To Cart</button>
                  <button className="btn btn-md btn-outline-secondary btn-icon" onClick={() => handleToggleWishlist(selectedProduct.asin)}>
                    <i className="far fa-heart"></i> Add To Wishlist
                  </button>
                </div>
                <div className="dz-info mb-0 mt-3">
                  {selectedProduct !== null && (
                    <ul><li><strong>SKU:</strong></li><li>{selectedProduct.asin}</li></ul>
                  )}
                  <ul>
                    <li><strong>Categories:</strong></li>
                    {selectedProduct !== null && (
                      <>
                        <li><a href={`/user/shop/shopWithCategory?salesRank=${selectedProduct.salesRank}`}>{selectedProduct.salesRank}{selectedProduct.productType && ','}</a></li>
                        {selectedProduct.productType && (
                          <li><a href={`/user/shop/shopWithCategory?productType=${selectedProduct.productType}`}>{selectedProduct.productType}</a></li>
                        )}
                      </>
                    )}
                  </ul>
                  <ul>
                    <li><strong>Tags:</strong></li>
                    {Object.entries(tags).map(([tag, count], index, arr) => (
                      <li key={tag}><a href="shop-standard.html">{tag}{index < arr.length - 1 ? ', ' : ''}</a></li>
                    ))}
                  </ul>
                  <div className="dz-social-icon">
                    <ul>
                      <li><a href="https://www.facebook.com/dexignzone" target="_blank" className="text-dark"><i className="fab fa-facebook-f" /></a></li>
                      <li><a href="https://twitter.com/dexignzones" target="_blank" className="text-dark"><i className="fab fa-twitter" /></a></li>
                      <li><a href="https://www.youtube.com/@dexignzone1723" target="_blank" className="text-dark"><i className="fab fa-youtube" /></a></li>
                      <li><a href="https://www.linkedin.com/showcase/3686700/admin/" target="_blank" className="text-dark"><i className="fab fa-linkedin-in" /></a></li>
                      <li><a href="https://www.instagram.com/dexignzone/" target="_blank" className="text-dark"><i className="fab fa-instagram" /></a></li>
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
      </div>
    </>
  );
}

export default ShopWithCategory;