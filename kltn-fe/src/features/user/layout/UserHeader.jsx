import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../assets/user/images/logo.svg';

//Import WOW.js
import WOW from 'wowjs';

function UserHeader() {
    const [selectedValue, setSelectedValue] = ('#000000'); // Initial value

    const handleRadioChange = (event) => {
      setSelectedValue(event.target.value);
    };

    useEffect(() => {
      const wow = new WOW.WOW({
        boxClass: 'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0,          // distance to the element when triggering the animation (default is 0)
        mobile: true,       // trigger animations on mobile devices (default is true)
        live: true,       // act on asynchronously loaded content (default is true)
        callback: function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in the callback is the DOM node being animated
        },
        scrollContainer: null,    // optional scroll container selector, otherwise use window
      });
      wow.init();
    }, []);
    return (
        <header className="site-header mo-left header style-1 header-transparent">
            {/* Main Header */}
            <div className="sticky-header main-bar-wraper navbar-expand-lg">
                <div className="main-bar clearfix">
                    <div className="container-fluid clearfix d-lg-flex d-block">

                        {/* Website Logo */}
                        <div className="logo-header logo-dark me-md-5">
                            <Link to="/"><img src={logo} alt="logo" /></Link>
                        </div>

                        {/* Nav Toggle Button */}
                        <button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>

                        {/* Main Nav */}
                        <div className="header-nav w3menu navbar-collapse collapse justify-content-start" id="navbarNavDropdown">
                            <div className="logo-header logo-dark">
                                <Link to="/"><img src="{logo}" alt="" /></Link>
                            </div>
                            <ul className="nav navbar-nav">
                                <li className="has-mega-menu sub-menu-down auto-width menu-left">
                                    <Link to="/"><span>Home</span><i className="fas fa-chevron-down tabindex" ></i></Link>
                                    <div className="mega-menu ">
                                        <ul className="demo-menu mb-0">
                                            <li>
                                                <Link to="/">
                                                    <img src="../assets/user/images/demo/demo-1.png" alt="/" />
                                                    <span className="menu-title">01 Home Page</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/index-2">
                                                    <img src="../assets/user/images/demo/demo-2.png" alt="/" />
                                                    <span className="menu-title">02 Home Page</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/index-3">
                                                    <img src="../assets/user/images/demo/demo-3.png" alt="/" />
                                                    <span className="menu-title">03 Home Page</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="has-mega-menu sub-menu-down">
                                    <Link to="/user/shop/shopWithCategory"><span>Shop</span><i className="fas fa-chevron-down tabindex" ></i></Link>
                                    <div className="mega-menu shop-menu">
                                        <ul>
                                            <li className="side-left">
                                                <ul>
                                                    <li><Link to="/user/shop/shopWithCategory" className="menu-title">Shop Structure</Link>
                                                        <ul>
                                                            <li><Link to="/">Shop Standard</Link></li>
                                                            <li><Link to="/">Shop List</Link></li>
                                                            <li><Link to="/user/shop/shopWithCategory">Shop With Category</Link></li>
                                                            <li><Link to="/">Shop Filters Top Bar</Link></li>
                                                            <li><Link to="/">Shop Sidebar</Link></li>
                                                            <li><Link to="/">Shop Style 1</Link></li>
                                                            <li><Link to="/">Shop Style 2</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="/user/productstructure/productDetail" className="menu-title">Product Structure</Link>
                                                        <ul>
                                                            <li><Link to="/">Default</Link></li>
                                                            <li><Link to="/user/productstructure/productDetail">Thumbnail</Link></li>
                                                            <li><Link to="/">Grid Media</Link></li>
                                                            <li><Link to="/">Carousel</Link></li>
                                                            <li><Link to="/">Full Width</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="/" className="menu-title">Shop Pages</Link>
                                                        <ul>
                                                            <li><Link to="/user/shoppages/wishList">Wishlist</Link></li>
                                                            <li><Link to="/user/shoppages/cart">Cart</Link></li>
                                                            <li><Link to="/user/shoppages/checkout">Checkout</Link></li>
                                                            <li><Link to="/user/shoppages/compare">Compare</Link></li>
                                                            <li><Link to="/user/shoppages/orderTracking">Order Tracking</Link></li>
                                                            <li><Link to="/user/auth/login">Login</Link></li>
                                                            <li><Link to="/user/auth/registration">Registration</Link></li>
                                                            <li><Link to="/user/auth/forgetPassword">Forget Password <div className="badge badge-sm rounded badge-animated">New</div></Link></li>
                                                        </ul>
                                                    </li>
                                                    <li className="month-deal">
                                                        <div className="clearfix me-3">
                                                            <h3>Deal of the month</h3>
                                                            <p className="mb-0">Yes! Send me exclusive offers, personalised, and unique gift ideas, tips for shopping on Pixio <Link to="/" className="dz-link-2">View All Products</Link></p>
                                                        </div>
                                                        <div className="sale-countdown">
                                                            <div className="countdown text-center">
                                                                <div className="date">
                                                                    <span className="time days text-primary"></span>
                                                                    <span className="work-time">Days</span>
                                                                </div>
                                                                <div className="date">
                                                                    <span className="time hours text-primary"></span>
                                                                    <span className="work-time">Hours</span>
                                                                </div>
                                                                <div className="date">
                                                                    <span className="time mins text-primary"></span>
                                                                    <span className="work-time">Minutess</span>
                                                                </div>
                                                                <div className="date">
                                                                    <span className="time secs text-primary"></span>
                                                                    <span className="work-time">Second</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="side-right">
                                                <div className="adv-media">
                                                    <img src="../assets/user/images/adv-1.png" alt="/" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="has-mega-menu sub-menu-down auto-width">
                                    <Link to="/user/blog/blogdetails/postStandard"><span>Blog</span><i className="fas fa-chevron-down tabindex"></i></Link>
                                    <div className="mega-menu">
                                        <ul>
                                            <li>
                                                <Link to="/" className="menu-title">Blog Dark Style</Link>
                                                <ul>
                                                    <li><Link to="/">Blog 2 Column</Link></li>
                                                    <li><Link to="/">Blog 2 Column Sidebar</Link></li>
                                                    <li><Link to="/">Blog 3 Column</Link></li>
                                                    <li><Link to="/">Blog Half Image</Link></li>
                                                </ul>
                                                <Link to="/" className="menu-title">Blog Light Style</Link>
                                                <ul>
                                                    <li><Link to="/">Blog 2 Column</Link></li>
                                                    <li><Link to="/">Blog 2 Column Sidebar</Link></li>
                                                    <li><Link to="/">Blog Half Image</Link></li>
                                                    <li><Link to="/">Blog Exclusive</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/" className="menu-title">Blog Sidebar</Link>
                                                <ul>
                                                    <li><Link to="/">Blog left Sidebar</Link></li>
                                                    <li><Link to="/">Blog Right Sidebar</Link></li>
                                                    <li><Link to="/">Blog Both Sidebar</Link></li>
                                                    <li><Link to="/">Blog Wide Sidebar</Link></li>
                                                </ul>
                                                <Link to="/" className="menu-title">Blog Page</Link>
                                                <ul>
                                                    <li><Link to="/">Blog Archive</Link></li>
                                                    <li><Link to="/">Author</Link></li>
                                                    <li><Link to="/">Blog Category</Link></li>
                                                    <li><Link to="/">Blog Tag</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/user/blog/blogdetails/postStandard" className="menu-title">Blog Details</Link>
                                                <ul>
                                                    <li><Link to="/user/blog/blogdetails/postStandard">Post Standard</Link></li>
                                                    <li><Link to="/">Post Left Sidebar</Link></li>
                                                    <li><Link to="/">Post Header Image</Link></li>
                                                    <li><Link to="/">Post Slide Show</Link></li>
                                                    <li><Link to="/">Post Side Image</Link></li>
                                                    <li><Link to="/">Post Gallery</Link></li>
                                                    <li><Link to="/">Post Gallery Alternative</Link></li>
                                                    <li><Link to="/">Post Open Gutenberg</Link></li>
                                                    <li><Link to="/">Post Link</Link></li>
                                                    <li><Link to="/">Post Audio</Link></li>
                                                    <li><Link to="/">Post Video</Link></li>
                                                </ul>
                                            </li>
                                            <li className="post-menu">
                                                <Link to="/" className="menu-title">Recent Posts</Link>
                                                <div className="widget widget_post pt-2">
                                                    <ul>
                                                        <li>
                                                            <div className="dz-media">
                                                                <img src="../assets/user/images/shop/product/small/1.png" alt="" />
                                                            </div>
                                                            <div className="dz-content">
                                                                <h6 className="name"><Link to="/">Cozy Knit Cardigan Sweater</Link></h6>
                                                                <span className="time">July 23, 2023</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="dz-media">
                                                                <img src="../assets/user/images/shop/product/small/2.png" alt="" />
                                                            </div>
                                                            <div className="dz-content">
                                                                <h6 className="name"><Link to="/">Sophisticated Swagger Suit</Link></h6>
                                                                <span className="time">July 23, 2023</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="dz-media">
                                                                <img src="../assets/user/images/shop/product/small/3.png" alt="" />
                                                            </div>
                                                            <div className="dz-content">
                                                                <h6 className="name"><Link to="/">Athletic Mesh Sports Leggings</Link></h6>
                                                                <span className="time">July 23, 2023</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="dz-media">
                                                                <img src="../assets/user/images/shop/product/small/4.png" alt="" />
                                                            </div>
                                                            <div className="dz-content">
                                                                <h6 className="name"><Link to="/">Satin Wrap Party Blouse</Link></h6>
                                                                <span className="time">July 23, 2023</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="has-mega-menu sub-menu-down">
                                    <Link to="/user/portfolio/portfolioTiles"><span>Portfolio</span><i className="fas fa-chevron-down tabindex"></i></Link>
                                    <div className="mega-menu portfolio-menu">
                                        <ul>
                                            <li className="side-left">
                                                <ul className="portfolio-nav-link">
                                                    <li>
                                                        <Link to="/user/portfolio/portfolioTiles">
                                                            <img src="../assets/user/images/portfolio/icons/portfolio-tiles.svg" alt="/" />
                                                            <span>Portfolio Tiles</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="../assets/user/images/portfolio/icons/collage-style-1.svg" alt="/" />
                                                            <span>Collage Style 1</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="../assets/user/images/portfolio/icons/collage-style-2.svg" alt="/" />
                                                            <span>Collage Style 2</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="../assets/user/images/portfolio/icons/masonry-grid.svg" alt="/" />
                                                            <span>Masonry Grid</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="../assets/user/images/portfolio/icons/cobble-style-1.svg" alt="/" />
                                                            <span>Cobble Style 1</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="../assets/user/images/portfolio/icons/cobble-style-2.svg" alt="/" />
                                                            <span>Cobble Style 2</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="../assets/user/images/portfolio/icons/portfolio-thumbs-slider.svg" alt="/" />
                                                            <span>Portfolio Thumbs Slider</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="../assets/user/images/portfolio/icons/portfolio-film-strip.svg" alt="/" />
                                                            <span>Portfolio Film Strip</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="../assets/user/images/portfolio/icons/carousel-showcase.svg" alt="/" />
                                                            <span>Carousel Showcase</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/">
                                                            <img src="../assets/user/images/portfolio/icons/portfolio-split-slider.svg" alt="/" />
                                                            <span>Portfolio Split Slider</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="side-right line-left">
                                                <Link to="/user/portfolio/portfolioDetails/portfolioDetails1" className="menu-title">Portfolio Details</Link>
                                                <ul>
                                                    <li><Link to="/user/portfolio/portfolioDetails/portfolioDetails1">Portfolio Details 1</Link></li>
                                                    <li><Link to="/">Portfolio Details 2</Link></li>
                                                    <li><Link to="/">Portfolio Details 3</Link></li>
                                                    <li><Link to="/">Portfolio Details 4</Link></li>
                                                    <li><Link to="/">Portfolio Details 5</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="has-mega-menu sub-menu-down wide-width">
                                    <Link to="/"><span>Pages</span><i className="fas fa-chevron-down tabindex"></i></Link>
                                    <div className="mega-menu">
                                        <ul>
                                            <li>
                                                <Link to="/" className="menu-title">Pages</Link>
                                                <ul>
                                                    <li><Link to="/">About Us</Link></li>
                                                    <li><Link to="/">About Me</Link></li>
                                                    <li><Link to="/">Pricing Table</Link></li>
                                                    <li><Link to="/">Our Gift Vouchers</Link></li>
                                                    <li><Link to="/">What We Do</Link></li>
                                                    <li><Link to="/">Faqs 1</Link></li>
                                                    <li><Link to="/">Faqs 2</Link></li>
                                                    <li><Link to="/">Our Team</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/" className="menu-title">Contact Us</Link>
                                                <ul>
                                                    <li><Link to="/">Contact Us 1</Link></li>
                                                    <li><Link to="/">Contact Us 2</Link></li>
                                                    <li><Link to="/">Contact Us 3</Link></li>
                                                </ul>
                                                <Link to="/" className="menu-title">Web Pages</Link>
                                                <ul>
                                                    <li><Link to="/">Error 404 1</Link></li>
                                                    <li><Link to="/">Error 404 2</Link></li>
                                                    <li><Link to="/">Coming Soon</Link></li>
                                                    <li><Link to="/">Under Construction</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/" className="menu-title">Banner Style</Link>
                                                <ul>
                                                    <li><Link to="/">Banner with BG Color</Link></li>
                                                    <li><Link to="/">Banner with Image</Link></li>
                                                    <li><Link to="/">Banner with Video</Link></li>
                                                    <li><Link to="/">Banner with Kanbern</Link></li>
                                                    <li><Link to="/">Banner Small</Link></li>
                                                    <li><Link to="/">Banner Medium</Link></li>
                                                    <li><Link to="/">Banner Large</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/" className="menu-title">Header Style</Link>
                                                <ul>
                                                    <li><Link to="/">Header Style 1</Link></li>
                                                    <li><Link to="/">Header Style 2</Link></li>
                                                    <li><Link to="/">Header Style 3</Link></li>
                                                    <li><Link to="/">Header Style 4</Link></li>
                                                    <li><Link to="/">Header Style 5</Link></li>
                                                    <li><Link to="/">Header Style 6</Link></li>
                                                    <li><Link to="/">Header Style 7</Link></li>
                                                    <li className="w3menulink"><Link to="/">Menu Styles</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/" className="menu-title">Footer Style</Link>
                                                <ul>
                                                    <li><Link to="/">Footer Style 1</Link></li>
                                                    <li><Link to="/">Footer Style 2</Link></li>
                                                    <li><Link to="/">Footer Style 3</Link></li>
                                                    <li><Link to="/">Footer Style 4</Link></li>
                                                    <li><Link to="/">Footer Style 5</Link></li>
                                                    <li><Link to="/">Footer Style 6</Link></li>
                                                    <li><Link to="/">Footer Style 7</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/user/myaccount/dashboard" className="menu-title">Dashboard</Link>
                                                <ul>
                                                    <li><Link to="/user/myaccount/dashboard">Dashboard</Link></li>
                                                    <li><Link to="/user/myaccount/orders">Orders</Link></li>
                                                    <li><Link to="/user/myaccount/ordersDetails">Orders Details</Link></li>
                                                    <li><Link to="/user/myaccount/ordersConfimation">Orders Confirmation</Link></li>
                                                    <li><Link to="/user/myaccount/download">Downloads</Link></li>
                                                    <li><Link to="/user/myaccount/returnRequest">Return Request</Link></li>
                                                    <li><Link to="/user/myaccount/returnRequestDetail">Return Request Detail</Link></li>
                                                    <li><Link to="/user/myaccount/returnRequestConfirmed">Return Request Confirmed</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sub-menu-down">
                                    <Link to="/"><span>My Account</span> <div className="badge badge-sm rounded badge-animated">New</div><i className="fas fa-chevron-down tabindex"></i></Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/user/myaccount/dashboard">Dashboard</Link></li>
                                        <li><Link to="/user/myaccount/orders">Orders</Link></li>
                                        <li><Link to="/user/myaccount/ordersDetails">Orders Details</Link></li>
                                        <li><Link to="/user/myaccount/ordersConfimation">Orders Confirmation</Link></li>
                                        <li><Link to="/user/myaccount/download">Downloads</Link></li>
                                        <li><Link to="/user/myaccount/returnRequest">Return Request</Link></li>
                                        <li><Link to="/user/myaccount/returnRequestDetail">Return Request Detail</Link></li>
                                        <li><Link to="/user/myaccount/returnRequestConfirmed">Return Request Confirmed</Link></li>
                                        <li><Link to="/user/myaccount/profile">Profile</Link></li>
                                        <li><Link to="/user/myaccount/address">Address</Link></li>
                                        <li><Link to="/user/myaccount/shippingMethods">Shipping methods</Link></li>
                                        <li><Link to="/user/myaccount/paymentMethods">Payment Methods</Link></li>
                                        <li><Link to="/user/myaccount/review">Review</Link></li>
                                        <li><Link to="/user/myaccount/billingAddress">Billing address</Link></li>
                                        <li><Link to="/user/myaccount/shippingAddress">Shipping address</Link></li>
                                        <li><Link to="/user/myaccount/cancellationRequests">Cancellation Requests</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="dz-social-icon">
                                <ul>
                                    <li><Link className="fab fa-facebook-f" target="_blank" to="https://www.facebook.com/dexignzone"></Link></li>
                                    <li><Link className="fab fa-twitter" target="_blank" to="https://twitter.com/dexignzones"></Link></li>
                                    <li><Link className="fab fa-linkedin-in" target="_blank" to="https://www.linkedin.com/showcase/3686700/admin/"></Link></li>
                                    <li><Link className="fab fa-instagram" target="_blank" to="https://www.instagram.com/dexignzone/"></Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* EXTRA NAV */}
                        <div className="extra-nav">
                            <div className="extra-cell">
                                <ul className="header-right">
                                    <li className="nav-item login-link">
                                        <Link className="nav-link" to="/user/auth/login">
                                            Login / Register
                                        </Link>
                                    </li>
                                    <li className="nav-item search-link">
                                        <Link className="nav-link" to="/" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                                            <i className="iconly-Light-Search"></i>
                                        </Link>
                                    </li>
                                    <li className="nav-item wishlist-link">
                                        <Link className="nav-link" to="/user/shoppages/wishList" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                            <i className="iconly-Light-Heart2"></i>
                                        </Link>
                                    </li>
                                    <li className="nav-item cart-link">
                                        <Link to="/user/shoppages/cart" className="nav-link cart-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                            <i className="iconly-Broken-Buy"></i>
                                            <span className="badge badge-circle">5</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item filte-link">
                                        <Link to="/" className="nav-link filte-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 13" fill="none">
                                                <rect y="11" width="30" height="2" fill="black" />
                                                <rect width="30" height="2" fill="black" />
                                            </svg>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Main Header End */}

            {/* SearchBar */}
            <div className="dz-search-area dz-offcanvas offcanvas offcanvas-top" tabIndex="{-1}" id="offcanvasTop">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    ×
                </button>
                <div className="container">
                    <form className="header-item-search">
                        <div className="input-group search-input">
                            <select className="default-select">
                                <option>All Categories</option>
                                <option>Clothes</option>
                                <option>UrbanSkirt</option>
                                <option>VelvetGown</option>
                                <option>LushShorts</option>
                                <option>Vintage</option>
                                <option>Wedding</option>
                                <option>Cotton</option>
                                <option>Linen</option>
                                <option>Navy</option>
                                <option>Urban</option>
                                <option>Business Meeting</option>
                                <option>Formal</option>
                            </select>
                            <input type="search" className="form-control" placeholder="Search Product" />
                            <button className="btn" type="button">
                                <i className="iconly-Light-Search"></i>
                            </button>
                        </div>
                        <ul className="recent-tag">
                            <li className="pe-0"><span>Quick Search :</span></li>
                            <li><Link to="/">Clothes</Link></li>
                            <li><Link to="/">UrbanSkirt</Link></li>
                            <li><Link to="/">VelvetGown</Link></li>
                            <li><Link to="/">LushShorts</Link></li>
                        </ul>
                    </form>
                    <div className="row">
                        <div className="col-xl-12">
                            <h5 className="mb-3">You May Also Like</h5>
                            <div className="swiper category-swiper2">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="shop-card">
                                            <div className="dz-media ">
                                                <img src="../assets/user/images/shop/product/1.png" alt="product1" />
                                            </div>
                                            <div className="dz-content">
                                                <h6 className="title"><Link to="/">SilkBliss Dress</Link></h6>
                                                <h6 className="price">$40.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="shop-card">
                                            <div className="dz-media ">
                                                <img src="../assets/user/images/shop/product/3.png" alt="product3" />
                                            </div>
                                            <div className="dz-content">
                                                <h6 className="title"><Link to="/">GlamPants</Link></h6>
                                                <h6 className="price">$30.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="shop-card">
                                            <div className="dz-media ">
                                                <img src="../assets/user/images/shop/product/4.png" alt="product4" />
                                            </div>
                                            <div className="dz-content">
                                                <h6 className="title"><Link to="/">ComfyLeggings</Link></h6>
                                                <h6 className="price">$35.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="shop-card">
                                            <div className="dz-media ">
                                                <img src="../assets/user/images/shop/product/2.png" alt="product2" />
                                            </div>
                                            <div className="dz-content">
                                                <h6 className="title"><Link to="/">ClassicCapri</Link></h6>
                                                <h6 className="price">$20.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="shop-card">
                                            <div className="dz-media ">
                                                <img src="../assets/user/images/shop/product/5.png" alt="product5" />
                                            </div>
                                            <div className="dz-content">
                                                <h6 className="title"><Link to="/">DapperCoat</Link></h6>
                                                <h6 className="price">$70.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="shop-card">
                                            <div className="dz-media ">
                                                <img src="../assets/user/images/shop/product/6.png" alt="product6" />
                                            </div>
                                            <div className="dz-content">
                                                <h6 className="title"><Link to="/">ComfyLeggings</Link></h6>
                                                <h6 className="price">$45.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="shop-card">
                                            <div className="dz-media ">
                                                <img src="../assets/user/images/shop/product/7.png" alt="product7" />
                                            </div>
                                            <div className="dz-content">
                                                <h6 className="title"><Link to="/">DenimDream Jeans</Link></h6>
                                                <h6 className="price">$40.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="shop-card">
                                            <div className="dz-media ">
                                                <img src="../assets/user/images/shop/product/4.png" alt="image4" />
                                            </div>
                                            <div className="dz-content">
                                                <h6 className="title"><Link to="/">SilkBliss Dress</Link></h6>
                                                <h6 className="price">$60.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* SearchBar */}

            {/* Sidebar cart */}
            <div className="offcanvas dz-offcanvas offcanvas offcanvas-end " tabIndex="{-1}" id="offcanvasRight">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    ×
                </button>
                <div className="offcanvas-body">
                    <div className="product-description">
                        <div className="dz-tabs">
                            <ul className="nav nav-tabs center" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="shopping-cart" data-bs-toggle="tab" data-bs-target="#shopping-cart-pane" type="button" role="tab" aria-controls="shopping-cart-pane" aria-selected="true">Shopping Cart
                                        <span className="badge badge-light">5</span>
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="wishlist" data-bs-toggle="tab" data-bs-target="#wishlist-pane" type="button" role="tab" aria-controls="wishlist-pane" aria-selected="false">Wishlist
                                        <span className="badge badge-light">2</span>
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content pt-4" id="dz-shopcart-sidebar">
                                <div className="tab-pane fade show active" id="shopping-cart-pane" role="tabpanel" aria-labelledby="shopping-cart" tabIndex="{0}">
                                    <div className="shop-sidebar-cart">
                                        <ul className="sidebar-cart-list">
                                            <li>
                                                <div className="cart-widget">
                                                    <div className="dz-media me-3">
                                                        <img src="../assets/user/images/shop/shop-cart/pic1.jpg" alt="" />
                                                    </div>
                                                    <div className="cart-content">
                                                        <h6 className="title"><Link to="/">Sophisticated Swagger Suit</Link></h6>
                                                        <div className="d-flex align-items-center">
                                                            <div className="btn-quantity light quantity-sm me-3">
                                                                <input type="text" value="1" name="demo_vertical2" readOnly  />
                                                            </div>
                                                            <h6 className="dz-price mb-0">$50.00</h6>
                                                        </div>
                                                    </div>
                                                    <Link to="/" className="dz-close">
                                                        <i className="ti-close"></i>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="cart-widget">
                                                    <div className="dz-media me-3">
                                                        <img src="../assets/user/images/shop/shop-cart/pic2.jpg" alt="" />
                                                    </div>
                                                    <div className="cart-content">
                                                        <h6 className="title"><Link to="/">Cozy Knit Cardigan Sweater</Link></h6>
                                                        <div className="d-flex align-items-center">
                                                            <div className="btn-quantity light quantity-sm me-3">
                                                                <input type="text" value="1" name="demo_vertical2" readOnly  />
                                                            </div>
                                                            <h6 className="dz-price mb-0">$40.00</h6>
                                                        </div>
                                                    </div>
                                                    <Link to="/" className="dz-close">
                                                        <i className="ti-close"></i>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="cart-widget">
                                                    <div className="dz-media me-3">
                                                        <img src="../assets/user/images/shop/shop-cart/pic3.jpg" alt="" />
                                                    </div>
                                                    <div className="cart-content">
                                                        <h6 className="title"><Link to="/">Athletic Mesh Sports Leggings</Link></h6>
                                                        <div className="d-flex align-items-center">
                                                            <div className="btn-quantity light quantity-sm me-3">
                                                                <input type="text" value="1" name="demo_vertical2" readOnly  />
                                                            </div>
                                                            <h6 className="dz-price  mb-0">$65.00</h6>
                                                        </div>
                                                    </div>
                                                    <Link to="/" className="dz-close">
                                                        <i className="ti-close"></i>
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="cart-total">
                                            <h5 className="mb-0">Subtotal:</h5>
                                            <h5 className="mb-0">300.00$</h5>
                                        </div>
                                        <div className="mt-auto">
                                            <div className="shipping-time">
                                                <div className="dz-icon">
                                                    <i className="flaticon flaticon-ship"></i>
                                                </div>
                                                <div className="shipping-content">
                                                    <h6 className="title pe-4">Congratulations , you've got free shipping!</h6>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-animated border-0" style={{ width: "75%" }} role="progressbar">
                                                            <span className="sr-only">75% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to="/user/shoppages/cart" className="btn btn-outline-secondary btn-block m-b20">Checkout</Link>
                                            <Link to="/user/shoppages/checkout" className="btn btn-secondary btn-block">View Cart</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="wishlist-pane" role="tabpanel" aria-labelledby="wishlist" tabIndex="{0}">
                                    <div className="shop-sidebar-cart">
                                        <ul className="sidebar-cart-list">
                                            <li>
                                                <div className="cart-widget">
                                                    <div className="dz-media me-3">
                                                        <img src="../assets/user/images/shop/shop-cart/pic1.jpg" alt="" />
                                                    </div>
                                                    <div className="cart-content">
                                                        <h6 className="title"><Link to="/">Sophisticated Swagger Suit</Link></h6>
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="dz-price  mb-0">$50.00</h6>
                                                        </div>
                                                    </div>
                                                    <Link to="/" className="dz-close">
                                                        <i className="ti-close"></i>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="cart-widget">
                                                    <div className="dz-media me-3">
                                                        <img src="../assets/user/images/shop/shop-cart/pic2.jpg" alt="" />
                                                    </div>
                                                    <div className="cart-content">
                                                        <h6 className="title"><Link to="/">Cozy Knit Cardigan Sweater</Link></h6>
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="dz-price  mb-0">$40.00</h6>
                                                        </div>
                                                    </div>
                                                    <Link to="/" className="dz-close">
                                                        <i className="ti-close"></i>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="cart-widget">
                                                    <div className="dz-media me-3">
                                                        <img src="../assets/user/images/shop/shop-cart/pic3.jpg" alt="" />
                                                    </div>
                                                    <div className="cart-content">
                                                        <h6 className="title"><Link to="/">Athletic Mesh Sports Leggings</Link></h6>
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="dz-price  mb-0">$65.00</h6>
                                                        </div>
                                                    </div>
                                                    <Link to="/" className="dz-close">
                                                        <i className="ti-close"></i>
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="mt-auto">
                                            <Link to="/user/shoppages/wishList" className="btn btn-secondary btn-block">Check Your Favourite</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Sidebar cart */}

            {/* Sidebar finter */}
            <div className="offcanvas dz-offcanvas offcanvas offcanvas-end " tabIndex="{-1}" id="offcanvasLeft">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    ×
                </button>
                <div className="offcanvas-body">
                    <div className="product-description">
                        <div className="widget widget_search">
                            <div className="form-group">
                                <div className="input-group">
                                    <input name="dzSearch" required="required" type="search" className="form-control" placeholder="Search Product" />
                                    <div className="input-group-addon">
                                        <button name="submit" value="Submit" type="submit" className="btn">
                                            <i className="icon feather icon-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="widget">
                            <h6 className="widget-title">Price</h6>
                            <div className="price-slide range-slider">
                                <div className="price">
                                    <div className="range-slider style-1">
                                        <div id="slider-tooltips" className="mb-3"></div>
                                        <span className="example-val" id="slider-margin-value-min"></span>
                                        <span className="example-val" id="slider-margin-value-max"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="widget">
                         <h6 className="widget-title">Color</h6>
                         <div className="d-flex align-items-center flex-wrap color-filter ps-2">
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1" value="#000000" aria-label="..."
                                     checked={selectedValue === '#000000'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2" value="#9BD1FF" aria-label="..."
                                     checked={selectedValue === '#9BD1FF'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3" value="#21B290" aria-label="..."
                                     checked={selectedValue === '#21B290'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel4" value="#FEC4C4" aria-label="..."
                                     checked={selectedValue === '#FEC4C4'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel5" value="#FF7354" aria-label="..."
                                     checked={selectedValue === '#FF7354'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel6" value="#51EDC8" aria-label="..."
                                     checked={selectedValue === '#51EDC8'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel7" value="#B77CF3" aria-label="..."
                                     checked={selectedValue === '#B77CF3'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel8" value="#FF4A76" aria-label="..."
                                     checked={selectedValue === '#FF4A76'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel9" value="#3E68FF" aria-label="..."
                                     checked={selectedValue === '#3E68FF'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                             <div className="form-check">
                                 <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabe20" value="#7BEF68" aria-label="..."
                                     checked={selectedValue === '#7BEF68'}
                                     onChange={handleRadioChange}
                                 />
                                 <span></span>
                             </div>
                         </div>
                     </div>

                        <div className="widget">
                            <h6 className="widget-title">Size</h6>
                            <div className="btn-group product-size">
                                <input type="radio" className="btn-check" name="btnradio1" id="btnradio11" checked />
                                <label className="btn" htmlFor="btnradio11">4</label>

                                <input type="radio" className="btn-check" name="btnradio1" id="btnradio21" />
                                <label className="btn" htmlFor="btnradio21">6</label>

                                <input type="radio" className="btn-check" name="btnradio1" id="btnradio31" />
                                <label className="btn" htmlFor="btnradio31">8</label>

                                <input type="radio" className="btn-check" name="btnradio1" id="btnradio41" />
                                <label className="btn" htmlFor="btnradio41">10</label>

                                <input type="radio" className="btn-check" name="btnradio1" id="btnradio51" />
                                <label className="btn" htmlFor="btnradio51">12</label>

                                <input type="radio" className="btn-check" name="btnradio1" id="btnradio61" />
                                <label className="btn" htmlFor="btnradio61">14</label>

                                <input type="radio" className="btn-check" name="btnradio1" id="btnradio71" />
                                <label className="btn" htmlFor="btnradio71">16</label>

                                <input type="radio" className="btn-check" name="btnradio1" id="btnradio81" />
                                <label className="btn" htmlFor="btnradio81">18</label>

                                <input type="radio" className="btn-check" name="btnradio1" id="btnradio91" />
                                <label className="btn" htmlFor="btnradio91">20</label>
                            </div>
                        </div>
                        <div className="widget widget_categories">
                            <h6 className="widget-title">Category</h6>
                            <ul>
                                <li className="cat-item cat-item-26"><Link to="/">Dresses</Link> (10)</li>
                                <li className="cat-item cat-item-36"><Link to="/">Top & Blouses</Link> (5)</li>
                                <li className="cat-item cat-item-43"><Link to="/">Boots</Link> (17)</li>
                                <li className="cat-item cat-item-27"><Link to="/">Jewelry</Link> (13)</li>
                                <li className="cat-item cat-item-40"><Link to="/">Makeup</Link> (06)</li>
                                <li className="cat-item cat-item-40"><Link to="/">Fragrances</Link> (17)</li>
                                <li className="cat-item cat-item-40"><Link to="/">Shaving & Grooming</Link> (13)</li>
                                <li className="cat-item cat-item-43"><Link to="/">Jacket</Link> (06)</li>
                                <li className="cat-item cat-item-36"><Link to="/">Coat</Link> (22)</li>
                            </ul>
                        </div>

                        <div className="widget widget_tag_cloud">
                            <h6 className="widget-title">Tags</h6>
                            <div className="tagcloud">
                                <Link to="/">Vintage</Link>
                                <Link to="/">Wedding</Link>
                                <Link to="/">Cotton</Link>
                                <Link to="/">Linen</Link>
                                <Link to="/">Navy</Link>
                                <Link to="/">Urban</Link>
                                <Link to="/">Business Meeting</Link>
                                <Link to="/">Formal</Link>
                            </div>
                        </div>
                        <Link to="/" className="btn btn-sm font-14 btn-secondary btn-sharp">RESET</Link>
                    </div>
                </div>
            </div>
            {/* filter sidebar */}

        </header>
    );
}

export default UserHeader;