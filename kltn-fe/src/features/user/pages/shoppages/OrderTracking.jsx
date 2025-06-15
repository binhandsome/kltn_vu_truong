// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function OrderTracking() {
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
  <section className="px-3">
    <div className="row align-center-center">
      <div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
        <div className="dz-bnr-inr-entry">
          <h1>Order Tracking</h1>
          <nav
            aria-label="breadcrumb text-align-start"
            className="breadcrumb-row"
          >
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html"> Home</a>
              </li>
              <li className="breadcrumb-item">Order Tracking</li>
            </ul>
          </nav>
        </div>
        <div className="registration-media">
          <img src="../../assets/user/images/registration/pic2.png" alt="/" />
        </div>
      </div>
      <div className="col-xxl-6 col-xl-6 col-lg-6 end-side-content">
        <div className="login-area">
          <h2 className="text-secondary text-center">Track Your Order</h2>
          <p className="text-center m-b30">
            welcome please login to your account
          </p>
          <form>
            <div className="m-b30">
              <label className="label-title">Order ID</label>
              <input
                name="dzName"
                required=""
                className="form-control"
                placeholder="Found in your order confirmation email."
                type="text"
              />
            </div>
            <div className="m-b30">
              <label className="label-title">Billing email</label>
              <input
                name="dzName"
                required=""
                className="form-control"
                placeholder="Email you used during checkout."
                type="email"
              />
            </div>
            <div className="text-center">
              <button className="btn btn-secondary btnhover text-uppercase">
                Track
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default OrderTracking;