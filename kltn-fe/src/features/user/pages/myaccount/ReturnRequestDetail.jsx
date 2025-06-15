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
  {/*Banner Start*/}
  <div
    className="dz-bnr-inr bg-secondary overlay-black-light"
    style={{ backgroundImage: "url(images/background/bg1.jpg)" }}
  >
    <div className="container">
      <div className="dz-bnr-inr-entry">
        <h1>Return Request Detail</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Return Request Detail</li>
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
              href="account-return-request-detail.html#accountSidebar"
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
            <div className="col-lg-6 m-b30">
              <div className="order-cancel-card">
                <div className="order-head">
                  <h6 className="mb-0">
                    Request No: <span className="text-primary">#1374837</span>
                  </h6>
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
          </div>
          <div className="row">
            <div className="col-12 m-b30">
              <h4>What do you want to return?</h4>
              <div className="custom-control custom-checkbox mb-1">
                <input
                  className="form-check-input radio"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Refund
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-1">
                <input
                  className="form-check-input radio"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Replacment
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="custom-control style-1">
                <input
                  className="form-check-input radio"
                  type="radio"
                  name="Methods1"
                  id="Methods7"
                />
                <label
                  className="custom-checkbox form-check-label payment"
                  htmlFor="Methods7"
                >
                  <span>
                    <span className="title">Direct bank Transfer</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="custom-control style-1">
                <input
                  className="form-check-input radio"
                  type="radio"
                  name="Methods1"
                  id="Methods8"
                />
                <label
                  className="custom-checkbox form-check-label payment"
                  htmlFor="Methods8"
                >
                  <span>
                    <span className="title">Gifte Card Wallet</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="col-md-6 m-t10">
              <a
                href="shop-wishlist.html"
                className="btn btn-secondary me-xl-3 me-2 btnhover20"
              >
                Submit Request
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  {/* Footer */}
  <footer className="site-footer style-1 bg-light">
    {/* Footer Top */}
    <div className="footer-top">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="widget widget_about me-2">
              <div className="footer-logo logo-white">
                <a href="index.html">
                  <img src="../../assets/user/images/logo.svg" alt="" />
                </a>
              </div>
              <ul className="widget-address">
                <li>
                  <p>
                    <span>Address</span> : 451 Wall Street, UK, London
                  </p>
                </li>
                <li>
                  <p>
                    <span>E-mail</span> : example@info.com
                  </p>
                </li>
                <li>
                  <p>
                    <span>Phone</span> : (064) 332-1233
                  </p>
                </li>
              </ul>
              <div className="subscribe_widget">
                <h6 className="title fw-medium text-capitalize">
                  subscribe to our newsletter
                </h6>
                <form
                  className="dzSubscribe style-1"
                  action="https://pixio.dexignzone.com/xhtml/script/mailchamp.php"
                  method="post"
                >
                  <div className="dzSubscribeMsg" />
                  <div className="form-group">
                    <div className="input-group mb-0">
                      <input
                        name="dzEmail"
                        required="required"
                        type="email"
                        className="form-control"
                        placeholder="Your Email Address"
                      />
                      <div className="input-group-addon">
                        <button
                          name="submit"
                          value="Submit"
                          type="submit"
                          className="btn"
                        >
                          <i className="icon feather icon-arrow-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div className="widget widget_post">
              <h5 className="footer-title">Recent Posts</h5>
              <ul>
                <li>
                  <div className="dz-media">
                    <img src="../../assets/user/images/shop/product/small/1.png" alt="" />
                  </div>
                  <div className="dz-content">
                    <h6 className="name">
                      <a href="post-standard.html">
                        Cozy Knit Cardigan Sweater
                      </a>
                    </h6>
                    <span className="time">July 23, 2024</span>
                  </div>
                </li>
                <li>
                  <div className="dz-media">
                    <img src="../../assets/user/images/shop/product/small/2.png" alt="" />
                  </div>
                  <div className="dz-content">
                    <h6 className="name">
                      <a href="post-standard.html">
                        Sophisticated Swagger Suit
                      </a>
                    </h6>
                    <span className="time">July 23, 2024</span>
                  </div>
                </li>
                <li>
                  <div className="dz-media">
                    <img src="../../assets/user/images/shop/product/small/3.png" alt="" />
                  </div>
                  <div className="dz-content">
                    <h6 className="name">
                      <a href="post-standard.html">
                        Athletic Mesh Sports Leggings
                      </a>
                    </h6>
                    <span className="time">July 23, 2024</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-xl-2 col-md-4 col-sm-4 col-6 wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="widget widget_services">
              <h5 className="footer-title">Our Stores</h5>
              <ul>
                <li>
                  <a href="javascript:void(0);">New York</a>
                </li>
                <li>
                  <a href="javascript:void(0);">London SF</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Edinburgh</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Los Angeles</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Chicago</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Las Vegas</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-xl-2 col-md-4 col-sm-4 col-6 wow fadeInUp"
            data-wow-delay="0.4s"
          >
            <div className="widget widget_services">
              <h5 className="footer-title">Useful Links</h5>
              <ul>
                <li>
                  <a href="javascript:void(0);">Privacy Policy</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Returns</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Contact Us</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Latest News</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Our Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-xl-2 col-md-4 col-sm-4 wow fadeInUp"
            data-wow-delay="0.5s"
          >
            <div className="widget widget_services">
              <h5 className="footer-title">Footer Menu</h5>
              <ul>
                <li>
                  <a href="javascript:void(0);">Instagram profile</a>
                </li>
                <li>
                  <a href="javascript:void(0);">New Collection</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Woman Dress</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Contact Us</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Latest News</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer Top End */}
    {/* Footer Bottom */}
    <div className="footer-bottom">
      <div className="container">
        <div className="row fb-inner wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-lg-6 col-md-12 text-start">
            <p className="copyright-text">
              © <span className="current-year">2024</span>{" "}
              <a href="https://www.dexignzone.com/">DexignZone</a> Theme. All
              Rights Reserved.
            </p>
          </div>
          <div className="col-lg-6 col-md-12 text-end">
            <div className="d-flex align-items-center justify-content-center justify-content-md-center justify-content-xl-end">
              <span className="me-3">We Accept: </span>
              <img src="../../assets/user/images/footer-img.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer Bottom End */}
  </footer>
  {/* Footer End */}
  <button className="scroltop" type="button">
    <i className="fas fa-arrow-up" />
  </button>
</div>


        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default ReturnRequestDetail;