// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function ReturnRequestDetail() {
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
		<div className="dz-bnr-inr bg-secondary overlay-black-light" style={{ backgroundImage: `url('../assets/user/images/background/bg1.jpg')` }}>
			<div className="container">
				<div className="dz-bnr-inr-entry">
					<h1>Return Request Detail</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Home</a></li>
							<li className="breadcrumb-item">Return Request Detail</li>
						</ul>
					</nav>
				</div>
			</div>	
		</div>
		
		<div className="content-inner-1">
			<div className="container">
                <div className="row">
					<aside className="col-xl-3">
						<div className="toggle-info">
							<h5 className="title mb-0">Account Navbar</h5>
							<a className="toggle-btn" href="account-return-request-detail.html#accountSidebar">Account Menu</a>
						</div>
						<div className="sticky-top account-sidebar-wrapper">
							<div className="account-sidebar" id="accountSidebar">
								<div className="profile-head">
									<div className="user-thumb">
										<img className="rounded-circle" src="../../assets/user/images/profile4.jpg" alt="Susan Gardner" />
									</div>
									<h5 className="title mb-0">Ronald M. Spino</h5>
									<span className="text text-primary">info@example.com</span>
								</div>
								<div className="account-nav">
									<div className="nav-title bg-light">DASHBOARD</div>
									<ul>
										<li><a href="/myaccount/dashboard">Dashboard</a></li>
										<li><a href="/myaccount/orders">Orders</a></li>
										<li><a href="/myaccount/download">Downloads</a></li>
										<li><a href="/myaccount/returnRequest">Return request</a></li>
									</ul>
									<div className="nav-title bg-light">ACCOUNT SETTINGS</div>
									<ul className="account-info-list">
										<li><a href="/myaccount/profile">Profile</a></li>
										<li><a href="/myaccount/address">Address</a></li>
										<li><a href="/myaccount/shippingMethods">Shipping methods</a></li>
										<li><a href="/myaccount/paymentMethods">Payment Methods</a></li>
										<li><a href="/myaccount/review">Review</a></li>
									</ul>
								</div>
							</div>
						</div>
                    </aside>
					<section className="col-xl-9 account-wrapper">
						<div className="row">
							<div className="col-lg-6 m-b30">
								<div className="order-cancel-card">
									<div className="order-head">
										<h6 className="mb-0">Request No: <span className="text-primary">#1374837</span></h6>
									</div>
									<a href="account-return-request-detail.html" className="order-cancel-box">
										<div className="cancel-media">
											<img src="../../assets/user/images/shop/small/pic1.png" alt="" />
										</div>
										<div className="order-cancel-content">
											<span>March 21, 2024</span>
											<h5 className="title mb-0">Collar Casual Shirt</h5>
											<p className="mb-2">Quantity: <strong className="text-black">1</strong></p>
											<h6 className="mb-0">$105</h6>
										</div>
									</a>
								</div>
							</div>
							<div className="col-lg-6 m-b30">
								<div className="order-cancel-card">
									<div className="order-head">
										<h6 className="mb-0">Request No: <span className="text-primary">#1374837</span></h6>
									</div>
									<a href="account-return-request-detail.html" className="order-cancel-box">
										<div className="cancel-media">
											<img src="../../assets/user/images/shop/small/pic2.png" alt="" />
										</div>
										<div className="order-cancel-content">
											<span>March 21, 2024</span>
											<h5 className="title mb-0">Collar Casual Shirt</h5>
											<p className="mb-2">Quantity: <strong className="text-black">1</strong></p>
											<h6 className="mb-0">$304</h6>
										</div>
									</a>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12 m-b30">
								<h4>What do you want to return?</h4>
								<div className="custom-control custom-checkbox mb-1">
									<input className="form-check-input radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
									<label className="form-check-label" for="flexRadioDefault1">Refund</label>
								</div>
								<div className="custom-control custom-checkbox mb-1">
									<input className="form-check-input radio" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
									<label className="form-check-label" for="flexRadioDefault2">Replacment</label>
								</div>
							</div>
							<div className="col-md-6">
								<div className="custom-control style-1">
									<input className="form-check-input radio" type="radio" name="Methods1" id="Methods7" />
									<label className="custom-checkbox form-check-label payment" for="Methods7">
										<span>
											<span className="title">Direct bank Transfer</span>
										</span>
									</label>
								</div>
							</div>
							<div className="col-md-6">
								<div className="custom-control style-1">
									<input className="form-check-input radio" type="radio" name="Methods1" id="Methods8" />
									<label className="custom-checkbox form-check-label payment" for="Methods8">
										<span>
											<span className="title">Gifte Card Wallet</span>
										</span>
									</label>
								</div>
							</div>
							<div className="col-md-6 m-t10">
								<a href="shop-wishlist.html" className="btn btn-secondary me-xl-3 me-2 btnhover20">Submit Request</a>
							</div>
						</div>
				</section>
			</div>
		</div>
		
	</div>
	<button className="scroltop" type="button"><i className="fas fa-arrow-up"></i></button>
</div> 

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default ReturnRequestDetail;