// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function Download() {
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
		<div className="dz-bnr-inr bg-light" style={{ backgroundImage: `url('../assets/user/images/background/bg1.jpg')` }}>
			<div className="container">
				<div className="dz-bnr-inr-entry">
					<h1>Tải xuống</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Trang chủ</a></li>
							<li className="breadcrumb-item">Tải xuống</li>
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
							<a className="toggle-btn" href="account-downloads.html#accountSidebar">Account Menu</a>
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
							<div className="table-responsive download-table">
								<table className="table check-tbl">
									<thead>
										<tr>
											<th>STT</th>
											<th>Ảnh sản phẩm</th>
											<th>Tên sản phẩm</th>
											<th>Hành động</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="product-item-price">1</td>
											<td className="product-item-img"><img src="../../assets/user/images/shop/small/pic1.png" alt="/" /></td>
											<td className="product-item-name"><h6>Collar Casual Shirt</h6></td>
											<td><a href="product-default.html" className="btn btn-md btn-outline-secondary btnhover20">Tải xuống</a></td>
										</tr>
										<tr>
											<td className="product-item-price">2</td>
											<td className="product-item-img"><img src="../../assets/user/images/shop/small/pic2.png" alt="/" /></td>
											<td className="product-item-name"><h6>Collar Tranding Shirt</h6></td>
											<td><a href="product-default.html" className="btn btn-md btn-outline-secondary btnhover20">Download</a></td>
										</tr>
										<tr>
											<td className="product-item-price">3</td>
											<td className="product-item-img"><img src="../../assets/user/images/shop/small/pic1.png" alt="/" /></td>
											<td className="product-item-name"><h6>Casual Full Shirt</h6></td>
											<td><a href="product-default.html" className="btn btn-md btn-outline-secondary btnhover20">Download</a></td>
										</tr>
										<tr>
											<td className="product-item-price">4</td>
											<td className="product-item-img"><img src="../../assets/user/images/shop/small/pic2.png" alt="/" /></td>
											<td className="product-item-name"><h6>Tranding Full Shirt</h6></td>
											<td><a href="product-default.html" className="btn btn-md btn-outline-secondary btnhover20">Download</a></td>
										</tr>
									</tbody>
								</table>
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

export default Download;