// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function ReturnRequest() {
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
    style={{ backgroundImage: "url(images/background/bg1.jpg)" }}
  >
    <div className="container">
      <div className="dz-bnr-inr-entry">
        <h1>Return Request</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Return Request</li>
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
              href="account-return-request.html#accountSidebar"
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
                <div className="nav-title bg-light">DASHBOARD</div>
                <ul>
                  <li>
                    <a href="account-dashboard.html">Dashboard</a>
                  </li>
                  <li>
                    <a href="account-orders.html">Orders</a>
                  </li>
                  <li>
                    <a href="account-downloads.html">Downloads</a>
                  </li>
                  <li>
                    <a href="account-return-request.html">Return request</a>
                  </li>
                </ul>
                <div className="nav-title bg-light">ACCOUNT SETTINGS</div>
                <ul className="account-info-list">
                  <li>
                    <a href="account-profile.html">Profile</a>
                  </li>
                  <li>
                    <a href="account-address.html">Address</a>
                  </li>
                  <li>
                    <a href="account-shipping-methods.html">Shipping methods</a>
                  </li>
                  <li>
                    <a href="account-payment-methods.html">Payment Methods</a>
                  </li>
                  <li>
                    <a href="account-review.html">Review</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <section className="col-xl-9 account-wrapper">
          <div className="row">
            <div className="col-12 m-b30">
              <h3 className="mb-0">REQUEST FOR PRODUCT RETURN (2)</h3>
            </div>
            <div className="col-lg-6 m-b30">
              <div className="order-cancel-card">
                <div className="order-head">
                  <h6 className="mb-0">
                    Request No: <span className="text-primary">#1374837</span>
                  </h6>
                  <a
                    href="javascript:void(0);"
                    className="btn-link text-underline text-success"
                  >
                    Return Made
                  </a>
                </div>
                <a
                  href="account-return-request-detail.html"
                  className="order-cancel-box"
                >
                  <div className="cancel-media">
                    <img src="../../assets/user/images/shop/small/pic1.png" alt="" />
                  </div>
                  <div className="order-cancel-content">
                    <span>March 21, 2024</span>
                    <h5 className="title mb-0">Collar Casual Shirt</h5>
                    <p className="mb-2">
                      Quantity: <strong className="text-black">1</strong>
                    </p>
                    <h6 className="mb-0">$105</h6>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-6 m-b30">
              <div className="order-cancel-card">
                <div className="order-head">
                  <h6 className="mb-0">
                    Request No: <span className="text-primary">#1374837</span>
                  </h6>
                  <a
                    href="javascript:void(0);"
                    className="btn-link text-underline text-priamry"
                  >
                    Request Submited
                  </a>
                </div>
                <a
                  href="account-return-request-detail.html"
                  className="order-cancel-box"
                >
                  <div className="cancel-media">
                    <img src="../../assets/user/images/shop/small/pic2.png" alt="" />
                  </div>
                  <div className="order-cancel-content">
                    <span>March 21, 2024</span>
                    <h5 className="title mb-0">Collar Casual Shirt</h5>
                    <p className="mb-2">
                      Quantity: <strong className="text-black">1</strong>
                    </p>
                    <h6 className="mb-0">$304</h6>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-6 m-b30">
              <div className="order-cancel-card">
                <div className="order-head">
                  <h6 className="mb-0">
                    Request No: <span className="text-primary">#1374837</span>
                  </h6>
                  <a
                    href="javascript:void(0);"
                    className="btn-link text-underline text-priamry"
                  >
                    Request Submited
                  </a>
                </div>
                <a
                  href="account-return-request-detail.html"
                  className="order-cancel-box"
                >
                  <div className="cancel-media">
                    <img src="../../assets/user/images/shop/small/pic1.png" alt="" />
                  </div>
                  <div className="order-cancel-content">
                    <span>March 21, 2024</span>
                    <h5 className="title mb-0">Classic Denim Skinny Jeans</h5>
                    <p className="mb-2">
                      Quantity: <strong className="text-black">1</strong>
                    </p>
                    <h6 className="mb-0">$657</h6>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-6 m-b30">
              <div className="order-cancel-card">
                <div className="order-head">
                  <h6 className="mb-0">
                    Request No: <span className="text-primary">#1374837</span>
                  </h6>
                  <a
                    href="javascript:void(0);"
                    className="btn-link text-underline text-priamry"
                  >
                    Request Submited
                  </a>
                </div>
                <a
                  href="account-return-request-detail.html"
                  className="order-cancel-box"
                >
                  <div className="cancel-media">
                    <img src="../../assets/user/images/shop/small/pic2.png" alt="" />
                  </div>
                  <div className="order-cancel-content">
                    <span>March 21, 2024</span>
                    <h5 className="title mb-0">Plaid Wool Winter Coat</h5>
                    <p className="mb-2">
                      Quantity: <strong className="text-black">1</strong>
                    </p>
                    <h6 className="mb-0">$245</h6>
                  </div>
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

export default ReturnRequest;