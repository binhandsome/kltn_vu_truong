// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function OrdersConfimation() {
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
        Xác nhận đơn hàng
          {/* Order Confirmation */}
        </h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Trang chủ</a>
            </li>
            <li className="breadcrumb-item">Xác nhận đơn hàng</li>
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
              href="account-order-confirmation.html#accountSidebar"
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
          <div className="confirmation-card account-card">
            <div className="thumb">
              <img src="../../assets/user/images/confirmation.png" alt="" />
            </div>
            <div className="text-center mt-4">
              <h4 className="mb-3 text-capitalize">
                Đơn hàng của bạn đã hoàn tất!
                {/* Your Order Is Completed ! */}
              </h4>
              <p className="mb-2">
                Bạn sẽ nhận được email xác nhận đơn hàng với thông tin chi tiết về
đơn hàng của bạn.
                {/* You will receive an order confirmation email with details of
                your order. */}
              </p>
              <p className="mb-0">ID đơn hàng: 267676GHERT105467</p>
              <div className="mt-4 d-sm-flex gap-3 justify-content-center">
                <a
                  href="account-order-details.html"
                  className="btn my-1 btn-secondary"
                >
                  Chi tiết đơn hàng{" "}
                </a>
                <a
                  href="index.html"
                  className="btn btn-outline-secondary my-1 btnhover20"
                >
                  Quay lại trang chủ{" "}
                </a>
              </div>
            </div>
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

export default OrdersConfimation;