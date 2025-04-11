// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function PaymentMethods() {
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
					<h1>Payment Methods</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Home</a></li>
							<li className="breadcrumb-item">Payment Methods</li>
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
							<a className="toggle-btn" href="account-payment-methods.html#accountSidebar">Account Menu</a>
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
						<div className="account-card">
							<form action="account-payment-methods.html#">
								<div className="row m-b30">
									<div className="col-md-12">
										<h4 className="title m-b15 text-capitalize">Payment Methods</h4>
									</div>
									<div className="col-md-6">
										<div className="custom-control style-1">
											<input className="form-check-input radio" type="radio" name="Methods1" id="Methods5" />
											<label className="custom-checkbox form-check-label payment" for="Methods5">
												<img src="../../assets/user/images/shop/payment/paypal.svg" alt="/" />
												<span>
													<span className="title">Paypal</span>
												</span>
											</label>
										</div>
									</div>
									<div className="col-md-6">
										<div className="custom-control style-1">
											<input className="form-check-input radio" type="radio" name="Methods1" id="Methods6" />
											<label className="custom-checkbox form-check-label payment" for="Methods6">
												<img src="../../assets/user/images/shop/payment/debit.svg" alt="/" />
												<span>
													<span className="title">Credit or Debit Card</span>
												</span>
											</label>
										</div>
									</div>
									<div className="col-md-6">
										<div className="custom-control style-1">
											<input className="form-check-input radio" type="radio" name="Methods1" id="Methods7" />
												<label className="custom-checkbox form-check-label payment" for="Methods7">
												<img src="../../assets/user/images/shop/payment/bank.svg" alt="/" />
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
												<img src="../../assets/user/images/shop/payment/cash.svg" alt="/" />
												<span>
													<span className="title">Cash on Delivery</span>
												</span>
											</label>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group m-b25">
											<label className="label-title">Card Number</label>
											<input type="number" name="dzNumber" required="" className="form-control" placeholder="1234 4567 8910 1112" />
										</div>
									</div>
									<div className="col-md-3">
										<div className="form-group m-b25">
											<label className="label-title">Expiry Date</label>
											<input type="date" required="" className="form-control" aria-label="calendar outline" />
										</div>
									</div>
									<div className="col-md-3">
										<div className="form-group m-b25">
											<label className="label-title">CVC/CVV</label>
											<input type="number" required="" className="form-control" placeholder="1234" />
										</div>
									</div>
								</div>
								<a href="account-order-confirmation.html" className="btn btn-secondary mt-2">Confirm Order</a>
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

export default PaymentMethods;