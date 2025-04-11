// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function Profile() {
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
					<h1>Profile</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Home</a></li>
							<li className="breadcrumb-item">Account Profile</li>
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
							<a className="toggle-btn" href="account-profile.html#accountSidebar">Account Menu</a>
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
							<div className="profile-edit">
								<div className="avatar-upload d-flex align-items-center">
									<div className=" position-relative ">
										<div className="avatar-preview thumb">
											<div id="imagePreview" style={{ backgroundImage: `url('../assets/user/images/profile3.jpg')` }}></div>
										</div>
										<div className="change-btn  thumb-edit d-flex align-items-center flex-wrap">
											<input type='file' className="form-control d-none"  id="imageUpload" accept=".png, .jpg, .jpeg" />
											<label for="imageUpload" className="btn btn-light ms-0"><i className="fa-solid fa-camera"></i></label>
										</div>	
									</div>
								</div>
								<div className="clearfix">
									<h2 className="title mb-0">John Doe</h2><span className="text text-primary">johndoe@example.com</span>
									
								</div>
							</div>
							<form action="account-profile.html#" className="row">
								<div className="col-lg-6">
									<div className="form-group m-b25">
										<label className="label-title">First Name</label>
										<input name="dzName" required className="form-control" />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group m-b25">
										<label className="label-title">Last Name</label>
										<input name="dzName" required className="form-control" />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group m-b25">
										<label className="label-title">Email address</label>
										<input type="email" name="dzEmail" required className="form-control" />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group m-b25">
										<label className="label-title">Phone</label>
										<input type="email" name="dzPhone" required className="form-control" />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group m-b25">
										<label className="label-title">New password (leave blank to leave unchanged)</label>
										<input type="password" name="dzOldPassword" required className="form-control" />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group m-b25">
										<label className="label-title">Confirm new password</label>
										<input type="password" name="dzNewPassword" required className="form-control" />
									</div>
								</div>
							</form>
							<div className="d-flex flex-wrap justify-content-between align-items-center">
								<div className="form-group">
									<div className="custom-control custom-checkbox text-black">
										<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
										<label className="form-check-label" for="basic_checkbox_1">Subscribe me to Newsletter</label>
									</div>
								</div>
								<button className="btn btn-primary mt-3 mt-sm-0" type="button">Update profile</button>
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

export default Profile;