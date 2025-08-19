// src/pages/common/HomePage.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom';
import WOW from 'wowjs'; // Import WOW.js
import axios from 'axios';
import { param } from 'jquery';
import { type } from '@testing-library/user-event/dist/type';
import { useLocation } from "react-router-dom";

function ShopSideBar() {
  
  const [hasBgClass, setHasBgClass] = useState(true);
  const [products, setProducts] = useState([]);
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
const location = useLocation();
  const asinList = location.state?.asinList || [];

  console.log("Danh sách ASIN nhận được:", asinList);
  useEffect(() => {
    if (selectedProduct) {
      const discountPrice = (
        selectedProduct.productPrice * quantity -
        (selectedProduct.productPrice * selectedProduct.percentDiscount) / 100 * quantity
      ).toFixed(2);
      setPriceDiscount(discountPrice);
    } else {
      setPriceDiscount(0);
    }
  }, [selectedProduct, quantity]);
  

  const handleChange = (e) => {
    const value = e.target.value;
    const parsed = parseInt(value);
    setQuantity(isNaN(parsed) || parsed < 1 ? 1 : parsed);
  };


  const addCart = async () => {
    const cartId = localStorage.getItem("cartId") || "";
    const token = localStorage.getItem("accessToken") || "";

    try {
      const payload = {
        token,
        asin: selectedProduct.asin,
        quantity,
        price: parseFloat(priceDiscount),
        cartId,
        size: selectedSize,
        nameColor: selectedColor?.name_color,
        colorAsin: JSON.stringify(selectedProduct.colors || []),
      };

      const response = await axios.post("http://localhost:8765/api/cart/addCart", payload);
      if (response.data.cartId) {
        localStorage.setItem("cartId", response.data.cartId);
      }

      window.dispatchEvent(new Event("cartUpdated"));

      // 👉 Chuyển sang trang Cart
      window.location.href = "/user/shoppages/cart";
    } catch (error) {
      console.error("❌ Không thể thêm giỏ hàng:", error.response?.data || error.message);
    }
  };
  const handleToggleWishlist = async (asin) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const isInWishlist = wishlistItems.some((item) => item.asin === asin);
    try {
      if (isInWishlist) {
        await axios.delete(`http://localhost:8765/api/wishlist/${asin}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:8765/api/wishlist/${asin}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 👉 Nếu thêm thành công thì đẩy sang trang wishlist
        window.location.href = "/user/shoppages/wishlist";
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
  const handlePageChangeProduct = (event) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    setCurrentPage(0);
    scrollToFilterWrapper();
  };
  useEffect(() => {
    console.log(products + 'product cua toi la');
  })
 useEffect(() => {
  const getRecommendationByUpload = async () => {
    try {
      // Tự build query: asins=val1&asins=val2...
      const query = asinList.map(a => `asins=${encodeURIComponent(a)}`).join("&");
      const url = `http://localhost:8765/api/search/by-list-asin?${query}`;

      const response = await axios.get(url);
      setProducts(response.data);

      console.log('fasfasfas', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  getRecommendationByUpload();
}, []);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      scrollToFilterWrapper();
    }
  };
  const getPageRange = () => {
    const startPage = Math.floor(currentPage / maxPagesToShow) * maxPagesToShow;
    const endPage = Math.min(startPage + maxPagesToShow, totalPages);
    return [...Array(endPage - startPage).keys()].map((i) => startPage + i);
  };

  const scrollToFilterWrapper = () => {
    const filterWrapper = document.querySelector(".filter-wrapper");
    if (filterWrapper) {
      filterWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    console.log('fasfasfasfasfas' + products);
  })
  useEffect(() => {
    if (hasBgClass) {
      document.body.classList.add('bg');
    } else {
      document.body.classList.remove('bg');
    }

    return () => {
      // Dọn dẹp: Xóa class khi component bị unmount
      document.body.classList.remove('bg');
    };
  }, [hasBgClass]); // Chạy lại useEffect khi hasBgClass thay đổi
  useEffect(() => { // New useEffect for WOW.js
    const wow = new WOW.WOW();
    wow.init();

    return () => { // Optional cleanup function
      //wow.sync(); // sync and remove the DOM
    };
  }, []);

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
                  Gợi Ý Dựa Trên Hình Ảnh
                  {/* Shop Just For You */}
                </h1>
                <nav aria-label="breadcrumb" className="breadcrumb-row">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html"> Trang chủ</a>
                    </li>
                    <li className="breadcrumb-item">                  Gợi Ý Dựa Trên Hình Ảnh
</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/*Banner End*/}
          <section className="content-inner-3 pt-3 z-index-unset">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-xl-12">
                  <div className="filter-wrapper">
                    <div className="filter-left-area">
                      <ul className="filter-tag">
                      
                      </ul>
                      <span>
                        {/* Showing 1–5 Of 50 Results */}
                      </span>
                    </div>
                    <div className="filter-right-area">
                      <div className="form-group border-0">
                        {/* <a
                  href="javascript:void(0);"
                  className="filter-top-btn"
                  id="filterTopBtn"
                >
                  <svg
                    className="me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                    width={20}
                    height={20}
                  >
                    <g id="Layer_29" data-name="Layer 29">
                      <path d="M2.54,5H15v.5A1.5,1.5,0,0,0,16.5,7h2A1.5,1.5,0,0,0,20,5.5V5h2.33a.5.5,0,0,0,0-1H20V3.5A1.5,1.5,0,0,0,18.5,2h-2A1.5,1.5,0,0,0,15,3.5V4H2.54a.5.5,0,0,0,0,1ZM16,3.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z" />
                      <path d="M22.4,20H18v-.5A1.5,1.5,0,0,0,16.5,18h-2A1.5,1.5,0,0,0,13,19.5V20H2.55a.5.5,0,0,0,0,1H13v.5A1.5,1.5,0,0,0,14.5,23h2A1.5,1.5,0,0,0,18,21.5V21h4.4a.5.5,0,0,0,0-1ZM17,21.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5v-2a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5Z" />
                      <path d="M8.5,15h2A1.5,1.5,0,0,0,12,13.5V13H22.45a.5.5,0,1,0,0-1H12v-.5A1.5,1.5,0,0,0,10.5,10h-2A1.5,1.5,0,0,0,7,11.5V12H2.6a.5.5,0,1,0,0,1H7v.5A1.5,1.5,0,0,0,8.5,15ZM8,11.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z" />
                    </g>
                  </svg>
                  Filter
                </a> */}
                      </div>
                      <div className="form-group">
                        {/* <select className="default-select">
                  <option>Latest</option>
                  <option>Popularity</option>
                  <option>Average rating</option>
                  <option>Latest</option>
                  <option>Low to high</option>
                  <option>high to Low</option>
                </select> */}
                      </div>
                      <div className="form-group Category">
                        <select className="default-select" value={pageSize} onChange={handlePageChangeProduct}>
                          <option value={20}>Sản phẩm</option>
                          <option value={32}>32 Sản phẩm</option>
                          <option value={44}>44 Sản phẩm</option>
                          <option value={60}>60 Sản phẩm</option>
                          <option value={72}>72 Sản phẩm</option>
                          <option value={84}>84 Sản phẩm</option>
                        </select>
                      </div>
                      <div className="shop-tab">
                        <ul className="nav" role="tablist" id="dz-shop-tab">
                   
                   
                          <li className="nav-item" role="presentation">
                            <a
                              href="shop-filters-top-bar.html#tab-list-grid"
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
                  <div className="col-xl-12 shop-top-filter">
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
                    <div className="shop-filter mt-xl-2 mt-0 " id="shopFilter">
                      <aside>
                        <div className="d-flex d-xl-none align-items-center justify-content-between m-b30">
                          <h6 className="title mb-0 fw-normal">
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
                          </h6>
                        </div>
                        <div className="widget widget_search">
                          <div className="form-group">
                            <div className="input-group">
                              <input
                                name="dzSearch"
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
                                  <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                                      stroke="#0D775E"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M17.5 17.5L13.875 13.875"
                                      stroke="#0D775E"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
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
                        <div className="widget">
                          <h6 className="widget-title">Màu sắc</h6>
                          <div className="d-flex align-items-center flex-wrap color-filter ps-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel01"
                                defaultValue="#000000"
                                aria-label="..."
                                defaultChecked=""
                              />
                              <span />
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel02"
                                defaultValue="#9BD1FF"
                                aria-label="..."
                              />
                              <span />
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel03"
                                defaultValue="#21B290"
                                aria-label="..."
                              />
                              <span />
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel04"
                                defaultValue="#FEC4C4"
                                aria-label="..."
                              />
                              <span />
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel05"
                                defaultValue="#FF7354"
                                aria-label="..."
                              />
                              <span />
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel06"
                                defaultValue="#51EDC8"
                                aria-label="..."
                              />
                              <span />
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel07"
                                defaultValue="#B77CF3"
                                aria-label="..."
                              />
                              <span />
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel08"
                                defaultValue="#FF4A76"
                                aria-label="..."
                              />
                              <span />
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel09"
                                defaultValue="#3E68FF"
                                aria-label="..."
                              />
                              <span />
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel20"
                                defaultValue="#7BEF68"
                                aria-label="..."
                              />
                              <span />
                            </div>
                          </div>
                        </div>
                        <div className="widget">
                          <h6 className="widget-title">Kích thước</h6>
                          <div className="btn-group product-size">
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio1"
                              id="btnradio101"
                              defaultChecked=""
                            />
                            <label className="btn" htmlFor="btnradio101">
                              4
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio1"
                              id="btnradiol02"
                            />
                            <label className="btn" htmlFor="btnradiol02">
                              6
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio1"
                              id="btnradiol03"
                            />
                            <label className="btn" htmlFor="btnradiol03">
                              8
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio1"
                              id="btnradiol04"
                            />
                            <label className="btn" htmlFor="btnradiol04">
                              10
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio1"
                              id="btnradiol05"
                            />
                            <label className="btn" htmlFor="btnradiol05">
                              12
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio1"
                              id="btnradiol06"
                            />
                            <label className="btn" htmlFor="btnradiol06">
                              14
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio1"
                              id="btnradiol07"
                            />
                            <label className="btn" htmlFor="btnradiol07">
                              16
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio1"
                              id="btnradiol08"
                            />
                            <label className="btn" htmlFor="btnradiol08">
                              18
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio1"
                              id="btnradiol09"
                            />
                            <label className="btn" htmlFor="btnradiol09">
                              20
                            </label>
                          </div>
                        </div>
                        <div className="widget widget_categories">
                          <h6 className="widget-title">Danh mục</h6>
                          <ul>
                            <li className="cat-item cat-item-26">
                              <a href="blog-category.html">Váy</a> (10)
                            </li>
                            <li className="cat-item cat-item-36">
                              <a href="blog-category.html">Áo &amp; Áo cánh</a> (5)
                            </li>
                            <li className="cat-item cat-item-43">
                              <a href="blog-category.html">
                                Bốt
                                {/* Boots */}
                              </a> (17)
                            </li>
                            <li className="cat-item cat-item-27">
                              <a href="blog-category.html">
                                Trang sức
                                {/* Jewelry */}
                              </a> (13)
                            </li>
                            <li className="cat-item cat-item-40">
                              <a href="blog-category.html">
                                Trang điểm
                                {/* Makeup */}
                              </a> (06)
                            </li>
                            <li className="cat-item cat-item-40">
                              <a href="blog-category.html">
                                Nước hoa
                                {/* Fragrances */}
                              </a> (17)
                            </li>
                            <li className="cat-item cat-item-40">
                              <a href="blog-category.html">Cạo râu &amp;Chải chuốt</a>{" "}
                              (13)
                            </li>
                            <li className="cat-item cat-item-43">
                              <a href="blog-category.html">Áo khoác</a> (06)
                            </li>
                            <li className="cat-item cat-item-36">
                              <a href="blog-category.html">Áo choàng</a> (22)
                            </li>
                          </ul>
                        </div>
                        <div className="widget widget_tag_cloud">
                          <h6 className="widget-title">Tags</h6>
                          <div className="tagcloud">
                            <a href="blog-tag.html">Vintage </a>
                            <a href="blog-tag.html">Wedding</a>
                            <a href="blog-tag.html">Cotton</a>
                            <a href="blog-tag.html">Linen</a>
                            <a href="blog-tag.html">Navy</a>
                            <a href="blog-tag.html">Urban</a>
                            <a href="blog-tag.html">Business Meeting</a>
                            <a href="blog-tag.html">Formal</a>
                          </div>
                        </div>
                      </aside>
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
            
                      </div>
                      <div
                        className="tab-pane fade"
                        id="tab-list-column"
                        role="tabpanel"
                        aria-labelledby="tab-list-column-btn"
                      >
          
                      </div>
                      <div
                        className="tab-pane fade active show"
                        id="tab-list-grid"
                        role="tabpanel"
                        aria-labelledby="tab-list-grid-btn"
                      >
                        <div className="row gx-xl-4 g-3">
                          {products.map((product, index) => (
                            <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
                              <div className="shop-card style-1">
                                <div className="dz-media">
                                  <img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_400,h_400/imgProduct/IMG/${product.productThumbnail}`} alt="image" />
                                  <div className="shop-meta">
                                    <div
                                      className="btn btn-secondary btn-md btn-rounded"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => {
                                        setSelectedProduct(product);
                                        setTimeout(() => {
                                          const modal = new window.bootstrap.Modal(
                                            document.getElementById('exampleModal')
                                          );
                                          modal.show();
                                        }, 100);
                                      }}
                                    >
                                      <i className="fa-solid fa-eye d-md-none d-block" />
                                      <span className="d-md-block d-none" >Quick View</span>
                                    </div>

                                    <div className="btn btn-primary meta-icon dz-wishicon">
                                      <i className="icon feather icon-heart dz-heart" />
                                      <i className="icon feather icon-heart-on dz-heart-fill" />
                                    </div>
                                    <div className="btn btn-primary meta-icon dz-carticon">
                                      <i className="flaticon flaticon-basket" />
                                      <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                                    </div>
                                  </div>
                                </div>
                                <div className="dz-content">
                                  <h5 className="title">
                                    <a href={`/user/productstructure/ProductDetail?asin=${product.asin}`}>
                                      {product.productTitle}
                                    </a>
                                  </h5>
                                  <h5 className="price"> ${(
                                    product.productPrice -
                                    product.productPrice * product.percentDiscount / 100
                                  ).toFixed(2)}</h5>
                                </div>
                                <div className="product-tag">
                                  <span className="badge ">                      Get {product.percentDiscount}% Off
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}


                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="tab-list-collage"
                        role="tabpanel"
                      >
          
                    
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
                                  <span className="text-secondary me-2">4.7 Rating</span>
                                  <a href="javascript:void(0);">(5 customer reviews)</a>
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
                                <span className="form-label">Price</span>
                                {selectedProduct !== null && (

                                  <span className="price">${priceDiscount} <del>${(selectedProduct.productPrice * quantity).toFixed(2)}</del></span>

                                )}
                              </div>
                              <div className="btn-quantity light me-0">
                                <label className="form-label fw-bold">Quantity</label>
                                <div className="input-group">
                                  <button
                                    className="btn btn-dark rounded-circle p-0"
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      backgroundColor: '#000',
                                      color: '#fff',
                                      border: 'none',
                                      minWidth: 'unset',      // ép bỏ min-width của Bootstrap
                                      flex: '0 0 auto'         // ngăn input-group ép dãn
                                    }}
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
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
                                      minWidth: 'unset',      // ép bỏ min-width của Bootstrap
                                      flex: '0 0 auto'         // ngăn input-group ép dãn
                                    }}
                                    onClick={() => setQuantity(q => Math.max(1, q + 1))}
                                  >+</button>
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
                                  <label className="form-label fw-bold">Color</label>
                                  <div className="d-flex align-items-center flex-wrap gap-2">
                                    {colors.map((color, index) => {
                                      const inputId = `colorRadioModal-${index}`;
                                      return (
                                        <div className="form-check" key={index}>
                                          <input
                                            type="radio"
                                            className="btn-check"
                                            name="colorRadioModal"
                                            id={inputId}
                                            checked={selectedColor?.name_color === color.name_color}
                                            onChange={() => setSelectedColor(color)}
                                          />
                                          <label
                                            className="btn"
                                            htmlFor={inputId}
                                            style={{
                                              backgroundColor: color.code_color,
                                              width: '32px',
                                              height: '32px',
                                              borderRadius: '50%',
                                              border: selectedColor?.name_color === color.name_color ? '2px solid black' : '1px solid #ccc',
                                              cursor: 'pointer',
                                              boxShadow: selectedColor?.name_color === color.name_color ? '0 0 3px rgba(0,0,0,0.5)' : 'none',
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

                            {/* --- CHỌN SIZE --- */}
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
                            <div className=" cart-btn">
                              <button onClick={addCart}
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
                                Add To Wishlist
                              </button>
                            </div>
                            <div className="dz-info mb-0">
                              {selectedProduct !== null && (

                                <ul><li><strong>SKU:</strong></li><li>{selectedProduct.asin}</li></ul>
                              )}
                              <ul>
                                <li>
                                  <strong>Categories:</strong>
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
        <ScrollTopButton />
      </div>
    </>
  );
}

export default ShopSideBar;