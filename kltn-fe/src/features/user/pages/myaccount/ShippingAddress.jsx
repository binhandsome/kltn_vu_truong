// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function ShippingAddress() {
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

<<<<<<< HEAD
  <div className="page-content bg-light">
  {/*Banner Start*/}
  <div
    className="dz-bnr-inr bg-secondary overlay-black-light"
    style={{ backgroundImage: "url(images/background/bg1.jpg)" }}
  >
    <div className="container">
      <div className="dz-bnr-inr-entry">
        <h1>Shipping Address</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Shipping Address</li>
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
              href="account-shipping-address.html#accountSidebar"
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
          <div className="account-card">
            <form className="row" action="account-shipping-address.html#">
              <h3 className="m-b30">Shipping address</h3>
              <div className="col-md-6">
                <div className="form-group m-b25">
                  <label className="label-title">First Name</label>
                  <input name="dzName" required="" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group m-b25">
                  <label className="label-title">Last Name</label>
                  <input name="dzName" required="" className="form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group m-b25">
                  <label className="label-title">Company name (optional)</label>
                  <input name="dzName" required="" className="form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="m-b25">
                  <label className="label-title">Country / Region *</label>
                  <select className="default-select form-select w-100">
                    <option selected="">India</option>
                    <option value={1}>Another option</option>
                    <option value={2}>UK</option>
                    <option value={3}>Iraq</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group m-b25">
                  <label className="label-title">Street address *</label>
                  <input
                    name="dzName"
                    required=""
                    className="form-control m-b15"
                    placeholder="House number and street name"
                  />
                  <input
                    name="dzName"
                    required=""
                    className="form-control"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="m-b25">
                  <label className="label-title">Town / City *</label>
                  <select className="form-select default-select w-100">
                    <option selected="">Kota</option>
                    <option value={1}>Another option</option>
                    <option value={2}>Jaipur</option>
                    <option value={3}>Udaipur</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="m-b25">
                  <label className="label-title">State*</label>
                  <select className="default-select form-select w-100">
                    <option selected="">Rajasthan</option>
                    <option value={1}>Another option</option>
                    <option value={2}>Rajasthan</option>
                    <option value={3}>Rajasthan</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group m-b25">
                  <label className="label-title">pincode*</label>
                  <input name="dzName" required="" className="form-control" />
                </div>
              </div>
            </form>
            <button className="btn btn-secondary">Save changes</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
=======
        <div className="page-content bg-light">
		<div className="dz-bnr-inr bg-light" style={{ backgroundImage: `url('../assets/user/images/background/bg1.jpg')` }}>
			<div className="container">
				<div className="dz-bnr-inr-entry">
					<h1>Shipping Address</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Home</a></li>
							<li className="breadcrumb-item">Shipping Address</li>
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
							<a className="toggle-btn" href="account-shipping-address.html#accountSidebar">Account Menu</a>
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
							<form className="row" action="account-shipping-address.html#">
								<h3 className="m-b30">Shipping address</h3>
								<div className="col-md-6">
									<div className="form-group m-b25">
										<label className="label-title">First Name</label>
										<input name="dzName" required="" className="form-control" />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group m-b25">
										<label className="label-title">Last Name</label>
										<input name="dzName" required="" className="form-control" />
									</div>
								</div>
								<div className="col-md-12">
									<div className="form-group m-b25">
										<label className="label-title">Company name (optional)</label>
										<input name="dzName" required="" className="form-control" />
									</div>
								</div>
								<div className="col-md-12">
									<div className="m-b25">
										<label className="label-title">Country / Region *</label>
										<select className="default-select form-select w-100">
											<option selected>India</option>
											<option value="1">Another option</option>
											<option value="2">UK</option>
											<option value="3">Iraq</option>
										</select>	
									</div>
								</div>
								<div className="col-md-12">
									<div className="form-group m-b25">
										<label className="label-title">Street address *</label>
										<input name="dzName" required="" className="form-control m-b15" placeholder="House number and street name" />
										<input name="dzName" required="" className="form-control" placeholder="Apartment, suite, unit, etc. (optional)" />
									</div>
								</div>
								<div className="col-md-12">
									<div className="m-b25">
										<label className="label-title">Town / City *</label>
										<select className="form-select default-select w-100">
											<option selected>Kota</option>
											<option value="1">Another option</option>
											<option value="2">Jaipur</option>
											<option value="3">Udaipur</option>
										</select>	
									</div>
								</div>
								<div className="col-md-12">
									<div className="m-b25">
										<label className="label-title">State*</label>
										<select className="default-select form-select w-100">
											<option selected>Rajasthan</option>
											<option value="1">Another option</option>
											<option value="2">Rajasthan</option>
											<option value="3">Rajasthan</option>
										</select>	
									</div>
								</div>
								<div className="col-md-12">
									<div className="form-group m-b25">
										<label className="label-title">pincode*</label>
										<input name="dzName" required="" className="form-control" />
									</div>
								</div>
							</form>
							<button className="btn btn-secondary">Save changes</button>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default ShippingAddress;