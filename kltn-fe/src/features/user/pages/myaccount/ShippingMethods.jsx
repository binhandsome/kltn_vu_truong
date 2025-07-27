// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function ShippingMethods() {
	const [hasBgClass, setHasBgClass] = useState(true); 
  
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
	}, [hasBgClass]); 
	useEffect(() => { 
		const wow = new WOW.WOW();
		wow.init();
		return () => { 
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
       Phương thức vận chuyển
          {/* Shipping Methods */}
        </h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Trang chủ</a>
            </li>
            <li className="breadcrumb-item">Phương thức vận chuyển</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {/*Banner End*/}
  <div className="content-inner-1">
    <div className="container">
      <div className="row">
        <aside className="col-xl-3">
          <div className="toggle-info">
            <h5 className="title mb-0">Account Navbar</h5>
            <a
              className="toggle-btn"
              href="account-shipping-methods.html#accountSidebar"
            >
              Account Menu
            </a>
          </div>
          <div className="sticky-top account-sidebar-wrapper">
            <div className="account-sidebar" id="accountSidebar">
              <div className="profile-head">
                <div className="user-thumb">
                  <img
                    className="rounded-circle"
                    src="../../assets/user/images/profile4.jpg"
                    alt="Susan Gardner"
                  />
                </div>
                <h5 className="title mb-0">Ronald M. Spino</h5>
                <span className="text text-primary">info@example.com</span>
              </div>
              <div className="account-nav">
                <div className="nav-title bg-light">
                BẢNG ĐIỀU KHIỂN
                  {/* DASHBOARD */}
                </div>
                <ul>
                  <li>
                    <a href="account-dashboard.html">
                    Trang tổng quan
                      {/* Dashboard */}
                    </a>
                  </li>
                  <li>
                    <a href="account-orders.html">
                    Đơn đặt hàng
                      {/* Orders */}
                    </a>
                  </li>
                  <li>
                    <a href="account-downloads.html">
                    Tải xuống
                      {/* Downloads */}
                    </a>
                  </li>
                  <li>
                    <a href="account-return-request.html">
                    Yêu cầu trả lại
                      {/* Return request */}
                    </a>
                  </li>
                </ul>
                <div className="nav-title bg-light">
                CÀI ĐẶT TÀI KHOẢN
                {/* ACCOUNT SETTINGS */}
                </div>
                <ul className="account-info-list">
                  <li>
                    <a href="account-profile.html">
                    Hồ sơ
                      {/* Profile */}
                    </a>
                  </li>
                  <li>
                    <a href="account-address.html">
                    Địa chỉ
                      {/* Address */}
                    </a>
                  </li>
                  <li>
                    <a href="account-shipping-methods.html">
                    Phương thức vận chuyển
                      {/* Shipping methods */}
                    </a>
                  </li>
                  <li>
                    <a href="account-payment-methods.html">
                    Phương thức thanh toán
                      {/* Payment Methods */}
                    </a>
                  </li>
                  <li>
                    <a href="account-review.html">
                      Đánh giá
                      {/* Review */}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <section className="col-xl-9 account-wrapper">
          <div className="account-card">
            <form className="row g-3">
              <div className="col-md-12">
                <h4 className="title m-b15 text-capitalize">
                 Phương thức thanh toán
                </h4>
              </div>
              <div className="col-lg-6">
                <div className="custom-control style-1 style-thumb mb-0">
                  <input
                    className="form-check-input radio"
                    type="radio"
                    name="Methods1"
                    id="Methods1"
                  />
                  <label
                    className="custom-checkbox form-check-label"
                    htmlFor="Methods1"
                  >
                    <img
                      className="thumb"
                      src="../../assets/user/images/shop/payment/fedex.svg"
                      alt="/"
                    />
                    <span>
                      <span className="title">FedEx,</span>
                      <span className="text">Delivery, Tomorrow</span>
                    </span>
                    <span className="price">$0.99</span>
                  </label>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="custom-control style-1 style-thumb mb-0">
                  <input
                    className="form-check-input radio"
                    type="radio"
                    name="Methods1"
                    id="Methods2"
                  />
                  <label
                    className="custom-checkbox form-check-label"
                    htmlFor="Methods2"
                  >
                    <img
                      className="thumb"
                      src="../../assets/user/images/shop/payment/american.svg"
                      alt="/"
                    />
                    <span>
                      <span className="title">American</span>
                      <span className="text">Delivery, Today</span>
                    </span>
                    <span className="price">$0.99</span>
                  </label>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="custom-control style-1 style-thumb mb-0">
                  <input
                    className="form-check-input radio"
                    type="radio"
                    name="Methods1"
                    id="Methods3"
                  />
                  <label
                    className="custom-checkbox form-check-label"
                    htmlFor="Methods3"
                  >
                    <img
                      className="thumb"
                      src="../../assets/user/images/shop/payment/dhl.svg"
                      alt="/"
                    />
                    <span>
                      <span className="title">DHL Express</span>
                      <span className="text">Delivery, Today</span>
                    </span>
                    <span className="price">$0.99</span>
                  </label>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="custom-control style-1 style-thumb mb-0">
                  <input
                    className="form-check-input radio"
                    type="radio"
                    name="Methods1"
                    id="Methods4"
                  />
                  <label
                    className="custom-checkbox form-check-label"
                    htmlFor="Methods4"
                  >
                    <img
                      className="thumb"
                      src="../../assets/user/images/shop/payment/retrieve.svg"
                      alt="/"
                    />
                    <span>
                      <span className="title">DHL Express</span>
                      <span className="text">Delivery, Today</span>
                    </span>
                    <span className="price">$0.99</span>
                  </label>
                </div>
              </div>
              <div className="col-12">
                <a
                  href="account-payment-methods.html"
                  className="btn btn-secondary mt-2"
                >
                  Continue to payment
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default ShippingMethods;